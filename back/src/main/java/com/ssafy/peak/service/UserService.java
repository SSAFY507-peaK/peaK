package com.ssafy.peak.service;

import java.io.IOException;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.ssafy.peak.exception.CustomException;
import com.ssafy.peak.exception.CustomExceptionType;
import com.ssafy.peak.repository.UserRepository;
import com.ssafy.peak.security.JwtTokenProvider;
import com.ssafy.peak.util.Utils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

	@Value("${redirectUrl}")
	private final String redirectUrl;
	private static final String SIGN_UP_URI = "/signup";
	private static final String nicknamePattern = "^[ㄱ-ㅎ가-힣A-Za-z0-9]{1,8}$";    // 1~8자 한글,영어,숫자
	private final JwtTokenProvider jwtTokenProvider;
	private final UserRepository userRepository;

	public void redirectSignupPage(HttpServletResponse response, Authentication authentication) {

		String accessToken = jwtTokenProvider.createAccessToken(authentication);
		try {
			String redirectUri = redirectUrl + SIGN_UP_URI;
			response.setStatus(HttpServletResponse.SC_OK);
			response.setHeader(Utils.ACCESS_TOKEN, Utils.BEARER_TOKEN_PREFIX + accessToken);
			response.sendRedirect(redirectUri);

		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public void login(HttpServletResponse response, Authentication authentication) {

		// AccessToken과 RefreshToken 발급
		String accessToken = jwtTokenProvider.createAccessToken(authentication);
		String refreshToken = jwtTokenProvider.createRefreshToken(authentication);

		try {
			String redirectUri = redirectUrl + SIGN_UP_URI;
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
}
