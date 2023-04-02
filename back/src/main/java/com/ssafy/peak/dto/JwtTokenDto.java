package com.ssafy.peak.dto;

import com.ssafy.peak.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JwtTokenDto {
	private String token;
	private String email;
	private Role role;
	private long expiration;
}