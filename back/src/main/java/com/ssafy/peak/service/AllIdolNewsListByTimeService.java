package com.ssafy.peak.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.peak.domain.news.AllIdolNewsListByTime;
import com.ssafy.peak.domain.news.News;
import com.ssafy.peak.dto.news.AllIdolNewsListByTimeRequestDto;
import com.ssafy.peak.dto.news.KeywordCounterRequestDto;
import com.ssafy.peak.dto.news.KeywordRelatedWordCounterResponseDto;
import com.ssafy.peak.dto.news.NewsResponseDto;
import com.ssafy.peak.dto.news.NewsSearchRequestDto;
import com.ssafy.peak.exception.CustomException;
import com.ssafy.peak.exception.CustomExceptionType;
import com.ssafy.peak.repository.AllIdolNewsListByTimeRepository;
import com.ssafy.peak.repository.NewsRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Slf4j
@Transactional(readOnly = true)
public class AllIdolNewsListByTimeService {

	private final AllIdolNewsListByTimeRepository allIdolNewsListByTimeRepository;
	private final NewsRepository newsRepository;

	@Transactional
	public void addAllIdolNewsList(
		AllIdolNewsListByTimeRequestDto allIdolNewsListByTimeRequestDto
	) {
		AllIdolNewsListByTime allIdolNewsList = allIdolNewsListByTimeRequestDto.toEntity();
		if (allIdolNewsListByTimeRepository.findByDateTime(allIdolNewsList.getDateTime()).isPresent())
			throw new CustomException(CustomExceptionType.ALL_IDOL_NEWS_ALREADY_EXIST);
		allIdolNewsListByTimeRepository.insert(allIdolNewsList);
	}

	public List<NewsResponseDto> findAllIdolIssueNewsList() {
		AllIdolNewsListByTime allIdolNewsList =
			allIdolNewsListByTimeRepository
				.findRecentAndNotEmptyNewsListAndNotEmptyKeywordCounter()
				.orElseThrow(() -> new CustomException(CustomExceptionType.ALL_IDOL_NEWS_NOT_FOUND));

		List<String> keywordList =
			allIdolNewsList
				.getKeywordCounter()
				.entrySet()
				.stream()
				.sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
				.map(Map.Entry::getKey)
				.limit(5)
				.collect(Collectors.toList());

		List<NewsResponseDto> allIdolIssueNewsList = new ArrayList<>();

		for (News news : allIdolNewsList.getNewsList()) {
			for (String keyword : keywordList) {
				if (news.getWordCounter().containsKey(keyword)) {
					allIdolIssueNewsList.add(NewsResponseDto.of(news));
					break;
				}
			}
		}

		return allIdolIssueNewsList;
	}

	public List<KeywordRelatedWordCounterResponseDto> findAllIdolKeywordRelatedWordCounterList() {
		AllIdolNewsListByTime allIdolNewsList =
			allIdolNewsListByTimeRepository
				.findRecentAndNotEmptyNewsListAndNotEmptyKeywordCounter()
				.orElseThrow(() -> new CustomException(CustomExceptionType.ALL_IDOL_NEWS_NOT_FOUND));

		List<String> keywordList =
			allIdolNewsList
				.getKeywordCounter()
				.entrySet()
				.stream()
				.sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
				.map(Map.Entry::getKey)
				.limit(5)
				.collect(Collectors.toList());

		int keywordCnt = keywordList.size();
		List<KeywordRelatedWordCounterResponseDto> keywordRelatedWordCounterList = new ArrayList<>(keywordCnt);

		for (String keyword : keywordList) {
			keywordRelatedWordCounterList.add(
				new KeywordRelatedWordCounterResponseDto(
					keyword,
					new HashMap<>()
				)
			);
		}

		for (News news : allIdolNewsList.getNewsList()) {
			for (int keywordIdx = 0; keywordIdx < keywordCnt; keywordIdx++) {
				Map<String, Integer> wordCounter
					= keywordRelatedWordCounterList.get(keywordIdx).getWordCounter();
				String keyword = keywordList.get(keywordIdx);
				if (news.getWordCounter().containsKey(keyword)) {
					news.getWordCounter().forEach(
						(key, value) -> wordCounter.merge(key, value, Integer::sum)
					);
				}
			}
		}
		return keywordRelatedWordCounterList;
	}

	public void addNewsToAllIdolNewsList(NewsSearchRequestDto newsSearchRequestDto) {
		long index = newsSearchRequestDto.getIndex();
		LocalDateTime dateTime = newsSearchRequestDto.getDateTime();
		String idol = newsSearchRequestDto.getIdol();
		News news = newsRepository
			.findByIndexAndDateTimeAndIdol(index, dateTime, idol)
			.orElseThrow(() -> new CustomException(CustomExceptionType.NEWS_NOT_FOUND));
		AllIdolNewsListByTime allIdolNewsList =
			allIdolNewsListByTimeRepository
				.findByDateTime(dateTime)
				.orElseThrow(() -> new CustomException(CustomExceptionType.ALL_IDOL_NEWS_NOT_FOUND));
		allIdolNewsList.getNewsList().add(news);
	}

	public void addKeywordCounterToAllIdolNewsList(KeywordCounterRequestDto keywordCounterRequestDto) {
		LocalDateTime dateTime = keywordCounterRequestDto.getDateTime();
		Map<String, Integer> keywordCounter = keywordCounterRequestDto.getKeywordCounter();
		AllIdolNewsListByTime allIdolNewsList =
			allIdolNewsListByTimeRepository
				.findByDateTime(dateTime)
				.orElseThrow(() -> new CustomException(CustomExceptionType.ALL_IDOL_NEWS_NOT_FOUND));
		allIdolNewsList.getKeywordCounter().putAll(keywordCounter);
	}
}
