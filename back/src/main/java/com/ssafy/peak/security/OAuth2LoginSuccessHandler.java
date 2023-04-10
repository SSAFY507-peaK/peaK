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

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

	private final UserService userService;

	@Override
	public void onAuthenticationSuccess(
		HttpServletRequest request,
		HttpServletResponse response,
		Authentication authentication) throws IOException, ServletException {

		CustomOAuth2User oAuth2User = (CustomOAuth2User)authentication.getPrincipal();
		Role role = oAuth2User.getRole();

		log.info("role: {}", role);

		if (role == Role.ROLE_GUEST) {
			log.info("회원가입 진행");
			userService.redirectSignupPage(response, authentication);

		} else if (role == Role.ROLE_USER) {
			log.info("로그인 진행");
			userService.login(response, authentication);
		}
	}
}
