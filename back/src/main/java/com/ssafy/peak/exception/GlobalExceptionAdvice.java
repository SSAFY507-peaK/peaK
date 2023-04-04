package com.ssafy.peak.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ssafy.peak.dto.response.ExceptionResponseDto;

import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionAdvice {

	@ExceptionHandler(value = CustomException.class)
	public ResponseEntity<ExceptionResponseDto> customExceptionHandler(CustomException e) {
		return getResponseEntity(e.getException());
	}

	@ExceptionHandler(value = RuntimeException.class)
	public ResponseEntity<ExceptionResponseDto> runtimeExceptionHandler(RuntimeException e) {
		log.info(e.getMessage());
		return getResponseEntity(CustomExceptionType.RUNTIME_EXCEPTION);
	}

	@ExceptionHandler(value = Exception.class)
	public ResponseEntity<ExceptionResponseDto> exceptionHandler(Exception e) {
		log.info(e.getMessage());
		return getResponseEntity(CustomExceptionType.INTERNAL_SERVER_ERROR);
	}

	private ResponseEntity<ExceptionResponseDto> getResponseEntity(CustomExceptionType exceptionType) {
		return ResponseEntity
			.status(exceptionType.getHttpStatus())
			.body(ExceptionResponseDto.builder()
				.code(exceptionType.getCode())
				.message(exceptionType.getMessage())
				.build());
	}

}
