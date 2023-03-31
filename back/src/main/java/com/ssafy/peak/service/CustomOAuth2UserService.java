package com.ssafy.peak.service;

import java.util.Collections;
import java.util.Map;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.ssafy.peak.dto.CustomOAuth2User;
import com.ssafy.peak.enums.Role;
import com.ssafy.peak.repository.UserRepository;
import com.ssafy.peak.util.Utils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

	private final UserRepository userRepository;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
		OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
		Map<String, Object> attributes = oAuth2User.getAttributes();

		log.info("attributes : {}", attributes);

		Map<String, Object> kakaoAccount = (Map<String, Object>)attributes.get(Utils.KAKAO_ACCOUNT);
		String email = (String)kakaoAccount.get(Utils.EMAIL);

		log.info("email: {}", email);

		String userNameAttributeName = oAuth2UserRequest.getClientRegistration()
			.getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

		log.info("userNameAttributeName: {}", userNameAttributeName);

		Role role = null;
		String testEmail = null;
		// if (userRepository.findByEmail(email) == null) {
		if (testEmail == null) {
			role = Role.ROLE_GUEST;
		} else {
			role = Role.ROLE_USER;
		}

		log.info("role: {}", role);

		return new CustomOAuth2User(
			Collections.singleton(new SimpleGrantedAuthority(String.valueOf(role))),
			attributes,
			userNameAttributeName,
			email,
			role
		);
	}
}
