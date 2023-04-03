package com.ssafy.peak.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.peak.dto.idol.IdolListResponseDto;
import com.ssafy.peak.dto.response.SuccessResponseDto;
import com.ssafy.peak.service.InterestService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/interest")
@RequiredArgsConstructor
@Slf4j
public class InterestController {

	private final InterestService interestService;

	/**
	 * 나의 관심 아이돌 리스트
	 */
	@GetMapping("/list")
	public ResponseEntity getInterestIdols() {

		IdolListResponseDto interestIdols = interestService.getInterestIdols();
		return ResponseEntity.ok().body(interestIdols);
	}

	/**
	 * 관심 아이돌 등록
	 */
	@PostMapping("/{idol-name}")
	public ResponseEntity addInterestIdol(@PathVariable("idol-name") String idolName) {

		interestService.addInterestIdol(idolName);
		return ResponseEntity.ok().body(new SuccessResponseDto("관심 아이돌 등록 완료"));
	}

	/**
	 * 관심 아이돌 삭제
	 */
	@DeleteMapping("/{idol-name}")
	public ResponseEntity deleteInterestIdol(@PathVariable("idol-name") String idolName) {

		interestService.deleteInterestIdol(idolName);
		return ResponseEntity.ok().body(new SuccessResponseDto("관심 아이돌 삭제 완료"));
	}
}
