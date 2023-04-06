package com.ssafy.peak.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.peak.dto.YouTubeDto;
import com.ssafy.peak.service.YouTubeService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController()
@RequestMapping("/youtube")
@RequiredArgsConstructor
@Slf4j
public class YouTubeController {

	private final YouTubeService youTubeService;

	/**
	 * 유튜브 리스트
	 */
	@GetMapping("/{keyword}")
	public ResponseEntity searchYouTube(@PathVariable("keyword") String keyword) {
		
		List<YouTubeDto> youTubeDtoList = youTubeService.searchYouTube(keyword);
		return ResponseEntity.ok().body(youTubeDtoList);
	}
}
