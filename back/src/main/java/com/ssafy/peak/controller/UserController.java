package com.ssafy.peak.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.peak.dto.request.UserRequestDto;
import com.ssafy.peak.dto.response.SuccessResponseDto;
import com.ssafy.peak.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

	private final UserService userService;

	/**
	 * 닉네임 중복 확인
	 */
	@PreAuthorize("hasRole('ROLE_GUEST')")
	@GetMapping("/nickname/{nickname}")
	public ResponseEntity checkNickname(@PathVariable("nickname") String nickname) {

		userService.checkNickname(nickname);
		return ResponseEntity.ok(new SuccessResponseDto("사용 가능한 닉네임입니다."));
	}

	/**
	 * 회원 가입
	 */
	@PreAuthorize("hasRole('ROLE_GUEST')")
	@GetMapping("/signup")
	public ResponseEntity signup(@RequestBody UserRequestDto userRequestDto) {

		return ResponseEntity.ok().body(null);
	}

}
