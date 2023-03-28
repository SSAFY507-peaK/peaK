package com.ssafy.peak.dto;

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
public class KakaoUserInfoDto {

	@JsonProperty("id")
	public Long id;
	@JsonProperty("connected_at")
	public String connectedAt;
	@JsonProperty("kakao_account")
	public KakaoAccount kakaoAccount;

	@Component
	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	@ToString
	static class KakaoAccount {

		@JsonProperty("has_email")
		public Boolean hasEmail;
		@JsonProperty("email_needs_agreement")
		public Boolean emailNeedsAgreement;
		@JsonProperty("is_email_valid")
		public Boolean isEmailValid;
		@JsonProperty("is_email_verified")
		public Boolean isEmailVerified;
		@JsonProperty("email")
		public String email;

	}

}
