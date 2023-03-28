package com.ssafy.peak.dto;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Component
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class KakaoTokenDto {

	@JsonProperty("access_token")
	private String accessToken;
	@JsonProperty("token_type")
	@Value("bearer")
	private String tokenType;
	@JsonProperty("refresh_token")
	private String refreshToken;
	@JsonProperty("expires_in")
	private Integer expiresIn;
	@JsonProperty("scope")
	private String scope;
	@JsonProperty("refresh_token_expires_in")
	private Integer refreshTokenExpiresIn;

}
