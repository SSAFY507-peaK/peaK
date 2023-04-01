package com.ssafy.peak.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignupDto {

	private String nickname;

	@JsonProperty("interest")
	private List<String> idolIds;

	private String accessToken;

	private String refreshToken;
}
