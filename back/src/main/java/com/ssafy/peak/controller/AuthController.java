package com.ssafy.peak.controller;

import java.nio.charset.StandardCharsets;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.ssafy.peak.util.OAuthKakaoUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/oauth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

	private static final String EMPTY = "";

	private final OAuthKakaoUtil oAuthKakaoUtil;

	// @PreAuthorize("isAuthenticated()")
	// @GetMapping("/kakao")
	// public String test(@AuthenticationPrincipal OAuth2User user, @RequestParam(value = "code") String code) {
	//
	// 	System.out.println("code = " + code);
	// 	return code;
	// }
	@PreAuthorize("isAuthenticated()")
	@GetMapping(value = "/kakao")
	public ResponseEntity getKakaoToken(@RequestParam String code) {
		RestTemplate restTemplate = new RestTemplateBuilder().build();

		log.info("OAuthKakaoUtil.TOKEN_URI: {}", oAuthKakaoUtil.TOKEN_URI);

		// uri
		UriComponents uriComponents = UriComponentsBuilder
			.fromUriString(oAuthKakaoUtil.TOKEN_URI)
			.encode(StandardCharsets.UTF_8)
			.build();

		log.info("uriComponents : {}", uriComponents);

		// header
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

		// body
		MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
		body.add("grant_type", oAuthKakaoUtil.AUTHORIZATION_GRANT_TYPE);
		body.add("code", code);
		body.add("redirect_uri", oAuthKakaoUtil.REDIRECT_URI);
		body.add("client_id", oAuthKakaoUtil.CLIENT_ID);

		// header + body => request
		HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, httpHeaders);

		String kakaoTokenResponse = restTemplate.postForObject(uriComponents.toUriString(), kakaoTokenRequest,
			String.class);
		return ResponseEntity.ok().body(kakaoTokenResponse);
	}
}
