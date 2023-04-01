package com.ssafy.peak.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.peak.dto.SignupDto;
import com.ssafy.peak.dto.UserDto;
import com.ssafy.peak.dto.response.SuccessResponseDto;
import com.ssafy.peak.service.UserService;
import com.ssafy.peak.util.Utils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

	private final UserService userService;

	/**
	 * 닉네임 유효성 검사
	 */
	@GetMapping("/nickname/{nickname}")
	public ResponseEntity checkNickname(@PathVariable("nickname") String nickname) {

		userService.checkNickname(nickname);
		return ResponseEntity.ok(new SuccessResponseDto("사용 가능한 닉네임입니다."));
	}

	/**
	 * 회원 가입
	 */
	@GetMapping("/sign-up")
	public ResponseEntity signup(
		@RequestHeader("Authorization") String token,
		@RequestBody UserDto userRequestDto) {

		token = token.split(Utils.BLANK)[1];
		SignupDto signupDto = userService.signup(token, userRequestDto);
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.set(Utils.ACCESS_TOKEN, Utils.BEARER_TOKEN_PREFIX + signupDto.getAccessToken());
		httpHeaders.set(Utils.REFRESH_TOKEN, Utils.BEARER_TOKEN_PREFIX + signupDto.getRefreshToken());

		UserDto userResponseDto = UserDto.builder()
			.nickname(signupDto.getNickname())
			.idols(signupDto.getIdolIds())
			.build();

		return ResponseEntity.ok().headers(httpHeaders).body(userResponseDto);
	}

}
