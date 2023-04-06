package com.ssafy.peak.service;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.peak.domain.news.News;
import com.ssafy.peak.dto.news.NewsRequestDto;
import com.ssafy.peak.dto.news.WordCounterRequestDto;
import com.ssafy.peak.exception.CustomException;
import com.ssafy.peak.exception.CustomExceptionType;
import com.ssafy.peak.repository.NewsRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Slf4j
@Transactional(readOnly = true)
public class NewsService {

	private final NewsRepository newsRepository;

	@Transactional
	public void addNews(NewsRequestDto newsRequestDto) {
		News news = newsRequestDto.toEntity();
		if (newsRepository.findByIndex(news.getIndex()).isPresent())
			throw new CustomException(CustomExceptionType.NEWS_ALREADY_EXIST);
		newsRepository.insert(news);
	}

	@Transactional
	public void addWordCounterToNews(WordCounterRequestDto wordCounterRequestDto) {
		Map<String, Integer> wordCounter = wordCounterRequestDto.getWordCounter();
		long index = wordCounterRequestDto.getIndex();
		LocalDateTime dateTime = wordCounterRequestDto.getDateTime();
		String idol = wordCounterRequestDto.getIdol();
		News news = newsRepository
			.findByIndexAndDateTimeAndIdol(index, dateTime, idol)
			.orElseThrow(() -> new CustomException(CustomExceptionType.NEWS_NOT_FOUND));
		news.getWordCounter().putAll(wordCounter);
		newsRepository.save(news);
	}
}
