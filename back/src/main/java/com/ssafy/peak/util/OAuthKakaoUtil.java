package com.ssafy.peak.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Getter;

@Getter
@Component
public class OAuthKakaoUtil {

	private OAuthKakaoUtil() {
	}

	@Value("${spring.security.oauth2.client.registration.kakao.authorization-grant-type}")
	public String AUTHORIZATION_GRANT_TYPE;
	@Value("${spring.security.oauth2.client.registration.kakao.client-id}")
	public String CLIENT_ID;
	@Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
	public String CLIENT_SECRET;
	@Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
	public String REDIRECT_URI;
	@Value("${spring.security.oauth2.client.provider.kakao.authorization-uri}")
	public String AUTHORIZATION_URI;
	@Value("${spring.security.oauth2.client.provider.kakao.token-uri}")
	public String TOKEN_URI;
	@Value("${spring.security.oauth2.client.provider.kakao.user-info-uri}")
	public String USER_INFO_URI;
	@Value("${spring.security.oauth2.client.provider.kakao.user-name-attribute}")
	public String USER_NAME_ATTRIBUTE;
}
