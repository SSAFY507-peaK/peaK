package com.ssafy.peak.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.peak.dto.KakaoTokenDto;
import com.ssafy.peak.dto.KakaoUserInfoDto;
import com.ssafy.peak.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

	private final UserService userService;

	@PreAuthorize("isAuthenticated()")
	@GetMapping(value = "/login/kakao")
	public ResponseEntity loginOAuth2Kakao(@RequestParam String code) {

		// 토큰 받기
		KakaoTokenDto kakaoTokenDto = userService.getKakaoToken(code);
		// 사용자 정보 가져오기
		KakaoUserInfoDto kakaoUserInfoDto = userService.getUserInfo(kakaoTokenDto);

		userService.checkUser(kakaoUserInfoDto);

		return ResponseEntity.ok().body(kakaoUserInfoDto);
	}

}
