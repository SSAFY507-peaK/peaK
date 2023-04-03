package com.ssafy.peak.util;

import java.time.LocalDateTime;

public class Utils {

	public static final String BLANK = " ";

	// JWT
	public static final String ROLE = "role";
	public static final String ROLE_GUEST = "ROLE_GUEST";
	public static final String ROLE_USER = "ROLE_USER";
	public static final String AUTHORIZATION = "Authorization";
	public static final String BEARER_TOKEN_PREFIX = "Bearer ";
	public static final String ACCESS_TOKEN = "AccessToken";
	public static final String REFRESH_TOKEN = "RefreshToken";
	public static final String AUTHENTICATION = "Authentication";

	// KAKAO OAUTH
	public static final String KAKAO_ACCOUNT = "kakao_account";
	public static final String EMAIL = "email";
	public static final String KAKAO = "kakao";

	public static LocalDateTime dateTimeToHour(LocalDateTime dateTime){
		LocalDateTime hourDateTime = dateTime.withMinute(0).withSecond(0).withNano(0);
		return hourDateTime.plusHours(9);
	}

	public static LocalDateTime dateTimeToDate(LocalDateTime dateTime){
		dateTime = dateTime.plusHours(9);
		LocalDateTime dateDateTime =  dateTime.withHour(0).withMinute(0).withSecond(0).withNano(0);
		return dateDateTime;
	}
}
