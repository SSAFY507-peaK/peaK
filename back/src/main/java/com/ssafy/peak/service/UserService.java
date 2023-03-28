package com.ssafy.peak.service;

import java.nio.charset.StandardCharsets;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.peak.dto.KakaoTokenDto;
import com.ssafy.peak.dto.KakaoUserInfoDto;
import com.ssafy.peak.util.OAuthKakaoUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
	private final OAuthKakaoUtil oAuthKakaoUtil;

	public KakaoTokenDto getKakaoToken(String code) {

		RestTemplate restTemplate = new RestTemplateBuilder().build();

		// uri
		UriComponents uriComponents = UriComponentsBuilder
			.fromUriString(oAuthKakaoUtil.TOKEN_URI)
			.encode(StandardCharsets.UTF_8)
			.build();

		// header
		HttpHeaders httpHeaders = new HttpHeaders();
		MediaType mediaType = new MediaType(MediaType.APPLICATION_FORM_URLENCODED, StandardCharsets.UTF_8);
		httpHeaders.setContentType(mediaType);
		// httpHeaders.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

		// body
		MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
		body.add("grant_type", oAuthKakaoUtil.AUTHORIZATION_GRANT_TYPE);
		body.add("code", code);
		body.add("redirect_uri", oAuthKakaoUtil.REDIRECT_URI);
		body.add("client_id", oAuthKakaoUtil.CLIENT_ID);

		// header + body => request
		HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, httpHeaders);

		log.info("kakaoTokenRequest: {}", kakaoTokenRequest);

		String kakaoTokenResponse = restTemplate
			.postForObject(
				uriComponents.toUriString(),
				kakaoTokenRequest,
				String.class);

		log.info("kakaoTokenResponse : {}", kakaoTokenResponse);

		ObjectMapper objectMapper = new ObjectMapper();
		KakaoTokenDto kakaoTokenDto = null;
		try {
			kakaoTokenDto = objectMapper.readValue(kakaoTokenResponse, KakaoTokenDto.class);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		log.info("kakaoTokenDto : {}", kakaoTokenDto);

		return kakaoTokenDto;
	}

	public KakaoUserInfoDto getUserInfo(KakaoTokenDto kakaoTokenDto) {

		RestTemplate restTemplate = new RestTemplateBuilder().build();

		// uri
		UriComponents uriComponents = UriComponentsBuilder
			.fromUriString(oAuthKakaoUtil.USER_INFO_URI)
			.encode(StandardCharsets.UTF_8)
			.build();

		// header
		HttpHeaders httpHeaders = new HttpHeaders();
		MediaType mediaType = new MediaType(MediaType.APPLICATION_FORM_URLENCODED, StandardCharsets.UTF_8);
		httpHeaders.setContentType(mediaType);
		httpHeaders.setBearerAuth(kakaoTokenDto.getAccessToken());
		// httpHeaders.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

		// header => request
		HttpEntity kakaoUserInfoRequest = new HttpEntity<>(httpHeaders);

		log.info("kakaoUserInfoRequest: {}", kakaoUserInfoRequest);

		ResponseEntity<String> kakaoUserInfoResponse = restTemplate
			.exchange(
				uriComponents.toUriString(),
				HttpMethod.GET,
				kakaoUserInfoRequest,
				String.class);

		log.info("kakaoUserInfoResponse.getBody() : {}", kakaoUserInfoResponse.getBody());

		ObjectMapper objectMapper = new ObjectMapper();
		KakaoUserInfoDto kakaoUserInfoDto = null;
		try {
			kakaoUserInfoDto = objectMapper.readValue(kakaoUserInfoResponse.getBody(), KakaoUserInfoDto.class);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		log.info("kakaoUserInfoDto : {}", kakaoUserInfoDto);

		return kakaoUserInfoDto;
	}

	public void checkUser(KakaoUserInfoDto kakaoUserInfoDto) {
		// 유저가 존재하면 로그인
		if (true) {

		}
		// 유저가 존재하지 않으면 닉네임 받고 회원가입
		else {

		}
	}
}
