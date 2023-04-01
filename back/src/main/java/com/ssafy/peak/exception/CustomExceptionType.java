package com.ssafy.peak.exception;

import org.springframework.http.HttpStatus;

public enum CustomExceptionType {
	RUNTIME_EXCEPTION(HttpStatus.BAD_REQUEST, "E001", "잘못된 요청입니다."),
	INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "E002", "서버 오류 입니다."),

	// USER
	USER_NOT_FOUND(HttpStatus.NOT_FOUND, "EU001", "사용자 정보가 존재하지 않습니다."),
	LOGIN_FAIL(HttpStatus.UNAUTHORIZED, "EU002", "이메일 또는 비밀번호를 확인해주세요."),
	ACCESS_TOKEN_ERROR(HttpStatus.UNAUTHORIZED, "EU003", "액세스 토큰 오류입니다."),
	REFRESH_TOKEN_ERROR(HttpStatus.UNAUTHORIZED, "EU004", "리프레쉬 토큰 오류입니다."),
	EXPIRED_AUTH_INFO(HttpStatus.NOT_FOUND, "EU005", "인증정보가 만료되었습니다."),
	USER_CONFLICT(HttpStatus.CONFLICT, "EU006", "이미 가입된 사용자입니다."),
	PASSWORD_NOT_MATCHED(HttpStatus.UNAUTHORIZED, "EU007", "비밀번호가 일치하지 않습니다."),
	AUTHORITY_ERROR(HttpStatus.FORBIDDEN, "EU008", "해당 기능을 요청할 권한이 없습니다."),
	UNQUALIFIED_NICKNAME(HttpStatus.BAD_REQUEST, "EU009", "닉네임은 8자 이하의 한글, 영문, 숫자만 가능합니다."),

	// DATA
	NO_CONTENT(HttpStatus.NOT_FOUND, "E011", "데이터가 존재하지 않습니다."),
	DO_NOT_DELETE(HttpStatus.BAD_REQUEST, "E012", "삭제할 수 없습니다.");

	private final HttpStatus httpStatus;
	private final String code;
	private String message;

	CustomExceptionType(HttpStatus httpStatus, String code) {
		this.httpStatus = httpStatus;
		this.code = code;
	}

	CustomExceptionType(HttpStatus httpStatus, String code, String message) {
		this.httpStatus = httpStatus;
		this.code = code;
		this.message = message;
	}

	public HttpStatus getHttpStatus() {
		return httpStatus;
	}

	public String getCode() {
		return code;
	}

	public String getMessage() {
		return message;
	}
}
