package com.ssafy.peak.controller;

import java.time.LocalDateTime;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.peak.dto.idol.response.IdolListResponseDto;
import com.ssafy.peak.dto.idol.response.IdolRankByDayResponseDto;
import com.ssafy.peak.dto.rank.RankByDateRequestDto;
import com.ssafy.peak.dto.rank.RankByHourRequestDto;
import com.ssafy.peak.dto.rank.RankResponseDto;
import com.ssafy.peak.dto.rank.TotalRankListResponseDto;
import com.ssafy.peak.dto.response.SuccessResponseDto;
import com.ssafy.peak.service.RankByDateService;
import com.ssafy.peak.service.RankByHourService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/peak")
@RequiredArgsConstructor
@Slf4j
public class PeakController {
	private final RankByHourService rankByHourService;
	private final RankByDateService rankByDateService;

	@GetMapping("/top")
	public IdolListResponseDto top() {
		LocalDateTime dateTime = LocalDateTime.now();
		return rankByHourService.top(dateTime);
	}

	@GetMapping("/")
	public TotalRankListResponseDto list() {
		LocalDateTime dateTime = LocalDateTime.now();
		return rankByHourService.list(dateTime);
	}

	@GetMapping("/weekly/{idol}")
	public IdolRankByDayResponseDto rankByIdolWeekly(@PathVariable("idol") String idol) {
		return rankByDateService.rankByIdolWeekly(idol);

	}

	@GetMapping("/current/{idol}")
	public RankResponseDto rankByIdol(@PathVariable("idol") String idol) {
		return rankByHourService.rankByIdol(idol);
	}

	@PostMapping("/rank-hour")
	public ResponseEntity insertRankHour(@RequestBody RankByHourRequestDto dto) {
		rankByHourService.insertRankByHour(dto);
		return ResponseEntity.ok(new SuccessResponseDto("데이터 삽입 완료"));
	}

	@PostMapping("/rank-date")
	public ResponseEntity insertRankDate(@RequestBody RankByDateRequestDto dto) {
		rankByDateService.insertRankByDate(dto);
		return ResponseEntity.ok(new SuccessResponseDto("데이터 삽입 완료"));
	}
}
