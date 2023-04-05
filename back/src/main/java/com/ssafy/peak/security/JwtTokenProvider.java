package com.ssafy.peak.security;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.ssafy.peak.domain.User;
import com.ssafy.peak.dto.CustomOAuth2User;
import com.ssafy.peak.dto.JwtTokenDto;
import com.ssafy.peak.enums.Role;
import com.ssafy.peak.exception.CustomException;
import com.ssafy.peak.exception.CustomExceptionType;
import com.ssafy.peak.repository.UserRepository;
import com.ssafy.peak.util.RedisUtil;
import com.ssafy.peak.util.Utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtTokenProvider implements InitializingBean {

	@Value("${jwt.secret}")
	private String secretKey;
	private long accessTokenValidTime;
	private long refreshTokenValidTime;
	private UserRepository userRepository;
	private RedisUtil redisUtil;
	private Key key;

	public JwtTokenProvider(
		@Value("${jwt.access-token-valid-time}") long accessTokenValidTime,
		@Value("${jwt.refresh-token-valid-time}") long refreshTokenValidTime,
		UserRepository userRepository,
		RedisUtil redisUtil) {
		this.accessTokenValidTime = accessTokenValidTime * 1000;
		this.refreshTokenValidTime = refreshTokenValidTime * 1000;
		this.userRepository = userRepository;
		this.redisUtil = redisUtil;
	}

	/**
	 * secret key 설정
	 */
	@Override
	public void afterPropertiesSet() throws Exception {
		byte[] keyBytes = Decoders.BASE64.decode(secretKey);
		this.key = Keys.hmacShaKeyFor(keyBytes);
	}

	/**
	 * 유저 인증 정보로 토큰 생성 (카카오 로그인 시)
	 */
	public String createTokensFromAuthentication(Authentication authentication, String tokenType) {

		CustomOAuth2User customOAuth2User = (CustomOAuth2User)authentication.getPrincipal();
		Date now = new Date();
		Date expiration = null;

		if (tokenType.equals(Utils.ACCESS_TOKEN)) {
			expiration = new Date(now.getTime() + accessTokenValidTime);
		} else if (tokenType.equals(Utils.REFRESH_TOKEN)) {
			expiration = new Date(now.getTime() + refreshTokenValidTime);
		}
		String token = Jwts.builder()
			.setSubject(customOAuth2User.getName()) // user id
			.claim(Utils.AUTHENTICATION, authentication) // authentication 저장
			.claim(Utils.EMAIL, customOAuth2User.getEmail())    // 이메일 정보 저장
			.claim(Utils.ROLE, customOAuth2User.getRole()) // 권한 정보 저장
			.setIssuedAt(now) // 액세스 토큰 발행 시간
			.setExpiration(expiration) // 액세스 토큰 유효 시간
			.signWith(SignatureAlgorithm.HS512, key) // 사용할 암호화 알고리즘 (HS512), signature 에 들어갈 secret key 세팅
			.compact();

		// refresh token은 redis에 저장
		if (tokenType.equals(Utils.REFRESH_TOKEN)) {
			String key = "RT:" + Encoders.BASE64.encode(customOAuth2User.getName().getBytes());
			redisUtil.setDataExpire(key, token, refreshTokenValidTime);

			log.info("createTokensFromAuthentication | key: {}", key);
		}
		return token;
	}

	/**
	 * 유저 정보로 토큰 생성
	 */
	public String createTokensFromUserPrincipal(UserPrincipal userPrincipal, String tokenType) {

		Date now = new Date();
		Date expiration = null;
		if (tokenType.equals(Utils.ACCESS_TOKEN)) {
			expiration = new Date(now.getTime() + accessTokenValidTime);
		} else if (tokenType.equals(Utils.REFRESH_TOKEN)) {
			expiration = new Date(now.getTime() + refreshTokenValidTime);
		}
		String token = Jwts.builder()
			.setSubject(userPrincipal.getName()) // user id
			.claim(Utils.EMAIL, userPrincipal.getEmail())    // 이메일 정보 저장
			.claim(Utils.ROLE, userPrincipal.getRole()) // 권한 정보 저장
			.setIssuedAt(now) // 토큰 발행 시간
			.setExpiration(expiration) // 토큰 유효 시간
			.signWith(SignatureAlgorithm.HS512, key) // 사용할 암호화 알고리즘 (HS512), signature 에 들어갈 secret key 세팅
			.compact();

		// refresh token은 redis에 저장
		if (tokenType.equals(Utils.REFRESH_TOKEN)) {
			String key = "RT:" + Encoders.BASE64.encode(userPrincipal.getName().getBytes());
			redisUtil.setDataExpire(key, token, refreshTokenValidTime);

			log.info("createTokensFromUserPrincipal | key: {}", key);
		}
		return token;
	}

	/**
	 * 인증 정보 조회
	 */
	public Authentication getAuthentication(String token) {
		UserPrincipal userPrincipal = null;

		Claims claims = parseClaims(token);

		log.info("claims: {}", claims);

		// 권한이 없는 경우 예외 발생
		if (claims.get(Utils.ROLE) == null) {
			log.info("claims.get(Utils.ROLE): {}", claims.get(Utils.ROLE));
			throw new CustomException(CustomExceptionType.AUTHORITY_ERROR);
		}
		if (claims.get(Utils.ROLE).equals(Utils.ROLE_GUEST)) {
			// 게스트 권한 (카카오 로그인 성공 후, 서비스 회원가입 중)이면 토큰 정보 꺼내와서 사용
			User user = User.builder()
				.id(claims.getSubject())
				.email(getEmailFromClaims(claims))
				.role(getRoleFromClaims(claims))
				.build();
			userPrincipal = UserPrincipal.createUserPrincipal(user);

			log.info("claims.get(Utils.ROLE).equals(Utils.ROLE_GUEST): {}",
				claims.get(Utils.ROLE).equals(Utils.ROLE_GUEST));

		} else if (claims.get(Utils.ROLE).equals(Utils.ROLE_USER)) {
			// 유저 권한 (카카로 로그인, 서비스 회원가입 완료)이면 db에서 조회해서 사용
			userPrincipal = userRepository.findById(claims.getSubject())
				.map(UserPrincipal::createUserPrincipal)
				.orElseThrow(() -> new CustomException(CustomExceptionType.AUTHORITY_ERROR));

			log.info("claims.get(Utils.ROLE).equals(Utils.ROLE_USER): {}",
				claims.get(Utils.ROLE).equals(Utils.ROLE_USER));

		}
		log.info("userPrincipal: {}", userPrincipal);
		//
		// Collection<? extends GrantedAuthority> authorities =
		// 	Arrays.stream(userPrincipal.getRole().toString().split(","))
		// 		.map(SimpleGrantedAuthority::new)
		// 		.collect(Collectors.toList());

		return new UsernamePasswordAuthenticationToken(userPrincipal, token, userPrincipal.getAuthorities());
	}

	/**
	 * 토큰 유효성 검사
	 * return 유효 토큰 여부
	 */
	public boolean validateToken(String token) {
		try {
			Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			return claims.getBody().getExpiration().after(new Date());
		} catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
			log.info("잘못된 JWT 서명입니다.");
		} catch (ExpiredJwtException e) {
			log.info("만료된 JWT 토큰입니다.");
		} catch (UnsupportedJwtException e) {
			log.info("지원되지 않는 JWT 토큰입니다.");
		} catch (IllegalArgumentException e) {
			log.info("JWT 토큰이 잘못되었습니다.");
		}
		return false;
	}

	/**
	 * Jwt 복호화
	 */
	public Claims parseClaims(String token) {
		try {
			return Jwts.parserBuilder()
				.setSigningKey(key).build()
				.parseClaimsJws(token)
				.getBody();

		} catch (ExpiredJwtException expiredJwtException) {
			return expiredJwtException.getClaims();
		}
	}

	/**
	 * Jwt 복호화 후 user id 가져오기
	 */
	public String getUserIdFromJwt(String token) {
		try {
			String userId = Jwts.parserBuilder()
				.setSigningKey(key).build()
				.parseClaimsJws(token)
				.getBody()
				.getSubject();
			return userId;

		} catch (ExpiredJwtException expiredJwtException) {
			return expiredJwtException.getClaims().getSubject();
		}
	}

	/**
	 * claims에서 email 가져오기
	 */
	public String getEmailFromClaims(Claims claims) {

		return claims.get(Utils.EMAIL).toString();
	}

	/**
	 * claims에서 role 가져오기
	 */
	public Role getRoleFromClaims(Claims claims) {

		return Role.valueOf(claims.get(Utils.ROLE).toString());
	}

	/**
	 * Jwt 복호화 후 token 만료 시간 가져오기
	 */
	public long getExpiration(String token) {
		try {
			long expiration = Jwts.parserBuilder()
				.setSigningKey(key).build()
				.parseClaimsJws(token)
				.getBody()
				.getExpiration()
				.getTime();
			long now = new Date().getTime();
			return expiration - now;

		} catch (ExpiredJwtException expiredJwtException) {
			return expiredJwtException.getClaims().getExpiration().getTime();
		}
	}

	/**
	 * 토큰 재발급
	 */
	public JwtTokenDto reissue(String token) {

		Authentication authentication = getAuthentication(token);
		UserPrincipal userPrincipal = (UserPrincipal)authentication.getPrincipal();
		String userId = userPrincipal.getId();

		log.info("userId: {}", userId);

		String key = "RT:" + Encoders.BASE64.encode(userId.getBytes());
		String refreshToken = redisUtil.getData(key);

		log.info("reissue key: {}", key);
		log.info("reissue refreshToken: {}", refreshToken);

		if (refreshToken == null) {
			throw new CustomException(CustomExceptionType.REFRESH_TOKEN_ERROR);
		}
		String accessToken = createTokensFromAuthentication(authentication, Utils.ACCESS_TOKEN);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		return JwtTokenDto.builder()
			.token(accessToken)
			.expiration(getExpiration(accessToken))
			.build();
	}
}
