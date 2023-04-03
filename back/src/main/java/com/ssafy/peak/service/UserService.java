package com.ssafy.peak.service;

import java.io.IOException;
import java.time.LocalDateTime;
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

import com.ssafy.peak.domain.Idol.Idol;
import com.ssafy.peak.domain.User;
import com.ssafy.peak.dto.CustomOAuth2User;
import com.ssafy.peak.dto.SignupDto;
import com.ssafy.peak.dto.UserDto;
import com.ssafy.peak.enums.Role;
import com.ssafy.peak.exception.CustomException;
import com.ssafy.peak.exception.CustomExceptionType;
import com.ssafy.peak.repository.IdolRepository;
import com.ssafy.peak.repository.UserRepository;
import com.ssafy.peak.security.JwtTokenProvider;
import com.ssafy.peak.security.UserPrincipal;
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
	private final SecurityUtil securityUtil;

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
	 * 회원가입
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
				.modifiedDatetime(LocalDateTime.now())
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
			.lastLoginDatetime(LocalDateTime.now())
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
	 * 로그인
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
			response.setHeader(Utils.ACCESS_TOKEN, Utils.BEARER_TOKEN_PREFIX + accessToken);
			response.setHeader(Utils.REFRESH_TOKEN, Utils.BEARER_TOKEN_PREFIX + refreshToken);

			response.setStatus(HttpServletResponse.SC_OK);
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
}
