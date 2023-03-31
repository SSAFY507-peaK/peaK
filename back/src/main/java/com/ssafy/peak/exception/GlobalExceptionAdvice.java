package com.ssafy.peak.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ssafy.peak.dto.response.ExceptionResponse;

import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionAdvice {

	@ExceptionHandler(value = CustomException.class)
	public ResponseEntity<ExceptionResponse> customExceptionHandler(CustomException e) {
		return getResponseEntity(e.getException());
	}

	@ExceptionHandler(value = RuntimeException.class)
	public ResponseEntity<ExceptionResponse> runtimeExceptionHandler(RuntimeException e) {
		log.info(e.getMessage());
		return getResponseEntity(CustomExceptionType.RUNTIME_EXCEPTION);
	}

	@ExceptionHandler(value = Exception.class)
	public ResponseEntity<ExceptionResponse> exceptionHandler(Exception e) {
		log.info(e.getMessage());
		return getResponseEntity(CustomExceptionType.INTERNAL_SERVER_ERROR);
	}

	private ResponseEntity<ExceptionResponse> getResponseEntity(CustomExceptionType exceptionType) {
		return ResponseEntity
			.status(exceptionType.getHttpStatus())
			.body(ExceptionResponse.builder()
				.code(exceptionType.getCode())
				.message(exceptionType.getMessage())
				.build());
	}
}
