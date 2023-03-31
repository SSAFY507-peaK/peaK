package com.ssafy.peak.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.ssafy.peak.dto.CustomOAuth2User;
import com.ssafy.peak.enums.Role;
import com.ssafy.peak.service.UserService;
import com.ssafy.peak.util.Utils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

	private final JwtTokenProvider jwtTokenProvider;
	private final UserService userService;

	@Override
	public void onAuthenticationSuccess(
		HttpServletRequest request,
		HttpServletResponse response,
		Authentication authentication) throws IOException, ServletException {

		log.info("OAuth2 로그인 성공");

		CustomOAuth2User oAuth2User = (CustomOAuth2User)authentication.getPrincipal();

		if (oAuth2User.getRole() == Role.ROLE_GUEST) {
			log.info("회원가입 하세요");

			String accessToken = jwtTokenProvider.createAccessToken(authentication);
			response.setHeader("AccessToken", Utils.BEARER_TOKEN_PREFIX + accessToken);
			response.sendRedirect("/singup");

		} else {
			log.info("로그인 진행 => 토큰 발급");

			userService.loginSuccess(response, authentication);
		}
	}
}
