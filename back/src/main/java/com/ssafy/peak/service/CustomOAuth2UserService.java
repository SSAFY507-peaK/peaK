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

		OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);    // 유저 정보 가져오기
		Map<String, Object> attributes = oAuth2User.getAttributes();    // 소셜 로그인 리소스 서버가 제공하는 유저 정보

		log.info("attributes: {}", attributes);

		Map<String, Object> kakaoAccount = (Map<String, Object>)attributes.get(Utils.KAKAO_ACCOUNT);    // 카카오 계정 정보
		String email = (String)kakaoAccount.get(Utils.EMAIL);    // 카카오 계정 이메일

		log.info("kakaoAccount: {}", kakaoAccount);

		String userNameAttributeName = oAuth2UserRequest
			.getClientRegistration()
			.getProviderDetails()
			.getUserInfoEndpoint()
			.getUserNameAttributeName();    // 카카오 회원 번호

		log.info("userNameAttributeName: {}", userNameAttributeName);

		Role role = null;
		if (userRepository.findByEmail(email).orElse(null) == null) {
			role = Role.ROLE_GUEST;    // 우리 서비스에 등록되지 않은 카카오 회원이면 GUEST 권한

			log.info("카카오 로그인 시, 비회원 상태 role: {}", role);

		} else {
			role = Role.ROLE_USER;    // 우리 서비스에 등록된 회원이면 USER 권한

			log.info("카카오 로그인 시, 회원 상태 role: {}", role);
		}

		return new CustomOAuth2User(
			Collections.singleton(new SimpleGrantedAuthority(String.valueOf(role))),
			attributes,
			userNameAttributeName,
			email,
			role
		);
	}
}
