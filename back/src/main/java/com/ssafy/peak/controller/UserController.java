package com.ssafy.peak.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.peak.dto.request.UserRequestDto;
import com.ssafy.peak.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

	private final UserService userService;

	@PreAuthorize("hasRole('ROLE_GUEST')")
	@GetMapping(value = "/nickname/${nickname}")
	public ResponseEntity nicknameCheck(@RequestBody UserRequestDto userRequestDto) {

		return ResponseEntity.ok().body(null);
	}

	@PreAuthorize("hasRole('ROLE_GUEST')")
	@GetMapping(value = "/signup")
	public ResponseEntity signup(@RequestBody UserRequestDto userRequestDto) {

		return ResponseEntity.ok().body(null);
	}

}
