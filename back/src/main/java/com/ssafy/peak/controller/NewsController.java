package com.ssafy.peak.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.peak.dto.news.AllIdolNewsListByTimeRequestDto;
import com.ssafy.peak.dto.news.IdolNewsListByTimeRequestDto;
import com.ssafy.peak.dto.news.KeywordRelatedWordCounterResponseDto;
import com.ssafy.peak.dto.news.NewsRequestDto;
import com.ssafy.peak.dto.news.NewsResponseDto;
import com.ssafy.peak.dto.news.WordCounterRequestDto;
import com.ssafy.peak.service.AllIdolNewsListByTimeService;
import com.ssafy.peak.service.IdolNewsListByTimeService;
import com.ssafy.peak.service.NewsService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/news")
@RequiredArgsConstructor
@Slf4j
public class NewsController {

	private final NewsService newsService;
	private final IdolNewsListByTimeService idolNewsListByTimeService;
	private final AllIdolNewsListByTimeService allIdolNewsListByTimeService;

	@PostMapping
	public ResponseEntity<Void> addNews(
		@RequestBody NewsRequestDto newsRequestDto
	) {
		newsService.addNews(newsRequestDto);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/list/idol")
	public ResponseEntity<Void> addIdolNewsListByTime(
		@RequestBody IdolNewsListByTimeRequestDto idolNewsListByTimeRequestDto
	) {
		idolNewsListByTimeService.addIdolNewsListByTime(idolNewsListByTimeRequestDto);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/list/all-idol")
	public ResponseEntity<Void> addAllIdolNewsListByTime(
		@RequestBody AllIdolNewsListByTimeRequestDto allIdolNewsListByTimeRequestDto
	) {
		allIdolNewsListByTimeService.addAllIdolNewsListByTime(allIdolNewsListByTimeRequestDto);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/list/all-idol")
	public ResponseEntity<List<NewsResponseDto>> findAllIdolIssueNewsList() {
		List<NewsResponseDto> allIdolNewsList = allIdolNewsListByTimeService.findAllIdolIssueNewsList();
		return ResponseEntity.ok(allIdolNewsList);
	}

	@GetMapping("/keywords/all-idol")
	public ResponseEntity<List<KeywordRelatedWordCounterResponseDto>> findAllIdolKeywordRelatedWordCounterList() {
		List<KeywordRelatedWordCounterResponseDto> keywordRelatedWordCounterList
			= allIdolNewsListByTimeService.findAllIdolKeywordRelatedWordCounterList();
		return ResponseEntity.ok(keywordRelatedWordCounterList);
	}

	@GetMapping("/list/keywords/{idol-name}")
	public ResponseEntity<Map<String, Object>> findIdolKeywordRelatedElements(
		@PathVariable("idol-name") String idol
	) {
		Map<String, Object> idolKeywordRelatedElements
			= idolNewsListByTimeService.findIdolKeywordRelatedElements(idol);
		return ResponseEntity.ok(idolKeywordRelatedElements);
	}

	@PostMapping("/word-counter")
	public ResponseEntity<Void> addWordCounterToNews(
		@RequestBody WordCounterRequestDto wordCounterRequestDto) {
		newsService.addWordCounterToNews(wordCounterRequestDto);
		return ResponseEntity.ok().build();
	}
}
