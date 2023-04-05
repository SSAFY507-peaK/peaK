package com.ssafy.peak.service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import com.ssafy.peak.domain.Comment;
import com.ssafy.peak.domain.Idol.Idol;
import com.ssafy.peak.domain.User;
import com.ssafy.peak.dto.CommentDto;
import com.ssafy.peak.dto.CustomOAuth2User;
import com.ssafy.peak.dto.SignupDto;
import com.ssafy.peak.dto.UserDto;
import com.ssafy.peak.dto.idol.response.IdolCommentResponseDto;
import com.ssafy.peak.enums.Role;
import com.ssafy.peak.exception.CustomException;
import com.ssafy.peak.exception.CustomExceptionType;
import com.ssafy.peak.repository.CommentRepository;
import com.ssafy.peak.repository.IdolRepository;
import com.ssafy.peak.repository.UserRepository;
import com.ssafy.peak.security.JwtTokenProvider;
import com.ssafy.peak.security.UserPrincipal;
import com.ssafy.peak.util.RedisUtil;
import com.ssafy.peak.util.SecurityUtil;
import com.ssafy.peak.util.Utils;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

	@Value("${redirectUrl}")
	private String redirectUrl;
	private static final String SIGN_UP_URI = "/signup";
	private static final String nicknamePattern = "^[ㄱ-ㅎ가-힣A-Za-z0-9]{1,8}$";    // 1~8자 한글,영어,숫자
	private final JwtTokenProvider jwtTokenProvider;
	private final UserRepository userRepository;
	private final IdolRepository idolRepository;
	private final CommentRepository commentRepository;
	private final SecurityUtil securityUtil;
	private final RedisUtil redisUtil;

	/**
	 * OAuth 로그인 후, 회원 가입에 필요한 추가 정보를 받기 위해 redirect
	 */
	public void redirectSignupPage(HttpServletResponse response, Authentication authentication) {

		String accessToken = jwtTokenProvider.createTokensFromAuthentication(authentication, Utils.ACCESS_TOKEN);

		log.info("accessToken: {}", accessToken);

		try {
			// String redirectUri = redirectUrl + SIGN_UP_URI;
			String redirectUri = new StringBuilder()
				.append(redirectUrl)
				.append(SIGN_UP_URI)
				.append(Utils.QUESTION_MARK)
				.append(Utils.BEARER_TOKEN_PREFIX)
				.append(accessToken)
				.toString();
			response.setStatus(HttpServletResponse.SC_OK);
			// response.setHeader(Utils.ACCESS_TOKEN, Utils.BEARER_TOKEN_PREFIX + accessToken);
			response.sendRedirect(redirectUri);

		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * peaK 회원가입과 동시에 로그인
	 */
	@Transactional(rollbackFor = Exception.class)
	public SignupDto signup(String token, UserDto userDto) {

		// 가입되어 있는지 확인
		String userId = jwtTokenProvider.getUserIdFromJwt(token);
		User findUser = userRepository.findById(userId).orElse(null);
		if (findUser != null) {
			throw new CustomException(CustomExceptionType.USER_CONFLICT);
		}
		// 관심 아이돌 수 제한
		if (userDto.getIdols().size() > 5) {
			throw new CustomException(CustomExceptionType.TO_MUCH_INTEREST);
		}

		// idol id list에 해당하는 idol list 조회
		List<Idol> idols = idolRepository.findByIdolIn(userDto.getIdols());
		if (CollectionUtils.isEmpty(idols)) {
			throw new CustomException(CustomExceptionType.NO_CONTENT);
		}
		List<User.Idol> interestIdols = idols.stream()
			.map(idol -> User.Idol.builder()
				.idol(idol.getIdol())
				.like(true)
				.modifiedDatetime(LocalDateTime.now().plusHours(9))
				.pageClicksCnt(0)
				.pageStaySec(0)
				.commentsCnt(0)
				.build())
			.collect(Collectors.toList());

		// token에서 정보 가져오기
		Claims claims = jwtTokenProvider.parseClaims(token);

		// user 정보 입력
		User user = User.builder()
			.id(userId)
			.email(jwtTokenProvider.getEmailFromClaims(claims))
			.role(Role.ROLE_USER)
			.nickname(userDto.getNickname())
			.provider(Utils.KAKAO)
			.lastLoginDatetime(LocalDateTime.now().plusHours(9))
			.favoriteIdolsCnt(userDto.getIdols().size())
			.idols(interestIdols)
			.build();

		// 토큰 발급 후 SecurityContext에 인증 정보 저장
		UserPrincipal userPrincipal = UserPrincipal.createUserPrincipal(user);
		String accessToken = jwtTokenProvider.createTokensFromUserPrincipal(userPrincipal, Utils.ACCESS_TOKEN);
		String refreshToken = jwtTokenProvider.createTokensFromUserPrincipal(userPrincipal, Utils.REFRESH_TOKEN);
		SecurityContextHolder.getContext()
			.setAuthentication(
				new UsernamePasswordAuthenticationToken(userPrincipal, accessToken, userPrincipal.getAuthorities()));

		// db에 user 정보 저장
		userRepository.save(user);

		return SignupDto.builder()
			.nickname(user.getNickname())
			.idolIds(userDto.getIdols())
			.accessToken(accessToken)
			.refreshToken(refreshToken)
			.build();
	}

	/**
	 * peak 회원 카카오 로그인
	 */
	public void login(HttpServletResponse response, Authentication authentication) {

		// AccessToken과 RefreshToken 발급
		String accessToken = jwtTokenProvider.createTokensFromAuthentication(authentication, Utils.ACCESS_TOKEN);
		String refreshToken = jwtTokenProvider.createTokensFromAuthentication(authentication, Utils.REFRESH_TOKEN);

		log.info("accessToken: {}", accessToken);

		CustomOAuth2User oAuth2User = (CustomOAuth2User)authentication.getPrincipal();
		SecurityContextHolder.getContext()
			.setAuthentication(
				new UsernamePasswordAuthenticationToken(oAuth2User, accessToken, oAuth2User.getAuthorities()));
		try {
			String redirectUri = redirectUrl;
			response.setStatus(HttpServletResponse.SC_OK);
			response.setHeader(Utils.ACCESS_TOKEN, Utils.BEARER_TOKEN_PREFIX + accessToken);
			response.sendRedirect(redirectUri);

		} catch (IOException e) {
			throw new RuntimeException(e);
		}

	}

	/**
	 * 닉네임 유효성 검사
	 */
	public void checkNickname(String nickname) {

		// 조건에 맞지 않는 닉네임이면 예외 발생
		if (!Pattern.matches(nicknamePattern, nickname)) {
			throw new CustomException(CustomExceptionType.UNQUALIFIED_NICKNAME);
		}
		// 존재하는 닉네임이면 예외 발생
		if (userRepository.findByNickname(nickname).isPresent()) {
			throw new CustomException(CustomExceptionType.USER_CONFLICT);
		}
	}

	/**
	 * 닉네임 수정
	 */
	@Transactional
	public void modifyNickname(String nickname) {

		// 조건에 맞지 않는 닉네임이면 예외 발생
		if (!Pattern.matches(nicknamePattern, nickname)) {
			throw new CustomException(CustomExceptionType.UNQUALIFIED_NICKNAME);
		}
		// user 인증 정보 확인 후 db 조회
		User user = securityUtil.getCurrentUserId()
			.flatMap(userRepository::findById)
			.orElseThrow(() -> new CustomException(CustomExceptionType.USER_NOT_FOUND));

		// (나를 제외하고) 존재하는 닉네임이면 예외 발생
		if (userRepository.findByNicknameAndIdNot(nickname, user.getId()).isPresent()) {
			throw new CustomException(CustomExceptionType.USER_CONFLICT);
		}
		//db 저장
		user.setNickname(nickname);
		userRepository.save(user);
	}

	/**
	 * 로그아웃
	 */
	public void logout(String token) {

		// user 인증 정보 확인 후 db 조회
		User user = securityUtil.getCurrentUserId()
			.flatMap(userRepository::findById)
			.orElseThrow(() -> new CustomException(CustomExceptionType.USER_NOT_FOUND));

		// String key = "RT:" + Encoders.BASE64.encode(user.getId().getBytes());
		// if (redisUtil.getData(key) != null) {
		// 	redisUtil.deleteData(key);
		// }
		// long expiration = jwtTokenProvider.getExpiration(token);
		// Date now = new Date();
		// redisUtil.setDataExpire(token, token, expiration - now.getTime());

		SecurityContextHolder.getContext().setAuthentication(null);
		log.info("로그아웃 유저 이메일 : '{}'", user.getEmail());
	}

	/**
	 * 아이돌에게 응원 한 마디
	 */
	@Transactional
	public void createCheeringMessage(UserPrincipal loginUser, String idolName, String content) {

		log.info("[{}] {}님 : {}", idolName, loginUser.getEmail(), content);

		// 내용이 존재하지 않으면 예외 처리
		if (!StringUtils.hasText(content)) {
			throw new CustomException(CustomExceptionType.WRITE_COMMENT);
		}
		// 오늘 해당 아이돌에게 쓴 응원 메시지가 있다면 예외 처리 (하루에 하나만 작성 가능)
		LocalDateTime start = LocalDateTime.of(LocalDate.now(), LocalTime.MIN).plusHours(9);    // 오늘 날짜 시작 시간
		LocalDateTime end = LocalDateTime.of(LocalDate.now(), LocalTime.MAX).plusHours(9);    // 오늘 날짜 끝 시간
		List<Comment> comments = commentRepository
			.findByEmailAndIdolAndDateTimeBetween(loginUser.getEmail(), idolName, start, end).orElse(null);
		if (!CollectionUtils.isEmpty(comments)) {
			throw new CustomException(CustomExceptionType.DO_NOT_WRITE_MESSAGE);
		}

		log.info("start / end / comment : {} / {} / {}", start, end, comments.toString());

		// 아이돌 조회
		Idol idol = idolRepository.findByIdol(idolName)
			.orElseThrow(() -> new CustomException(CustomExceptionType.IDOL_NOT_FOUND));

		// 유저 조회
		User user = userRepository.findById(loginUser.getId())
			.orElseThrow(() -> new CustomException(CustomExceptionType.USER_NOT_FOUND));

		log.info("idol: {}", idol);
		log.info("user: {}", user);

		// // 유저의 아이돌 기록 조회
		// User.Idol userIdolInfo = userRepository.findByIdAndIdols_Idol(loginUser.getId(), idol).orElse(null);

		User.Idol userIdolInfo = null;
		for (int i = 0; i < user.getIdols().size(); i++) {
			if (idolName.equals(user.getIdols().get(i).getIdol())) {
				userIdolInfo = user.getIdols().get(i);
			}
		}

		log.info("userIdolInfo: {}", userIdolInfo);

		if (userIdolInfo != null) {
			// 기록이 있는 아이돌이면 comment count 갱신
			userIdolInfo.setCommentsCnt(userIdolInfo.getCommentsCnt() + 1);
		} else {
			// 기록이 없는 아이돌이면 생성
			userIdolInfo = User.Idol.builder()
				.idol(idolName)
				.like(false)
				.modifiedDatetime(LocalDateTime.now().plusHours(9))
				.commentsCnt(1)
				.build();
			user.getIdols().add(userIdolInfo);
		}
		// comment 생성
		Comment comment = Comment.builder()
			.email(loginUser.getEmail())
			.idol(idol.getIdol())
			.dateTime(LocalDateTime.now().plusHours(9))
			.content(content)
			.build();

		// 아이돌 total comments count 갱신
		idol.setTotalCommentsCount(idol.getTotalCommentsCount() + 1);

		commentRepository.save(comment);
		userRepository.save(user);
		idolRepository.save(idol);
	}

	/**
	 * 최근 2주 동안 내가 남긴 관심 아이돌 별 응원 메시지
	 */
	public IdolCommentResponseDto getMyCheeingMessages(UserPrincipal loginUser, String idolName) {

		// 유저 조회
		User user = userRepository.findById(loginUser.getId())
			.orElseThrow(() -> new CustomException(CustomExceptionType.USER_NOT_FOUND));

		// 아이돌 존재 확인
		idolRepository.findByIdol(idolName).orElseThrow(() -> new CustomException(CustomExceptionType.IDOL_NOT_FOUND));

		// 유저의 아이돌 기록 조회
		List<User.Idol> userIdols = user.getIdols();
		if (CollectionUtils.isEmpty(userIdols)) {
			throw new CustomException(CustomExceptionType.NO_CONTENT);
		}
		// 관심 아이돌 조회
		User.Idol interestIdol = null;
		for (int i = 0; i < userIdols.size(); i++) {
			if (idolName.equals(userIdols.get(i).getIdol()) && userIdols.get(i).isLike()) {
				interestIdol = userIdols.get(i);
			}
		}
		// 관심 아이돌이 없으면 예외처리
		if (interestIdol == null) {
			throw new CustomException(CustomExceptionType.NOT_INTEREST);
		}
		// 2주 간 해당 아이돌에게 쓴 나의 응원 메시지 리스트 조회
		LocalDateTime start = LocalDateTime.of(LocalDate.now(), LocalTime.MIN).plusHours(9)
			.minusDays(13);    // 13일 전 시작시간
		LocalDateTime end = LocalDateTime.of(LocalDate.now(), LocalTime.MAX).plusHours(9);    // 오늘 날짜 끝 시간
		List<Comment> comments = commentRepository
			.findByEmailAndIdolAndDateTimeBetween(loginUser.getEmail(), idolName, start, end).orElse(null);

		List<CommentDto> commentDtoList = new ArrayList<>();
		if (CollectionUtils.isEmpty(comments)) {
			return null;
		} else {
			for (Comment comment : comments) {
				commentDtoList.add(CommentDto.of(comment, user.getNickname()));
			}
			return IdolCommentResponseDto.builder().comments(commentDtoList).build();
		}
	}
}
