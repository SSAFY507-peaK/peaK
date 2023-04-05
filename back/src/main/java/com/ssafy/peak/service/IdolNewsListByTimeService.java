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

import com.ssafy.peak.domain.news.IdolNewsListByTime;
import com.ssafy.peak.domain.news.News;
import com.ssafy.peak.dto.news.IdolNewsListByTimeRequestDto;
import com.ssafy.peak.dto.news.KeywordCounterRequestDto;
import com.ssafy.peak.dto.news.KeywordRelatedNewsListResponseDto;
import com.ssafy.peak.dto.news.KeywordRelatedWordCounterResponseDto;
import com.ssafy.peak.dto.news.NewsResponseDto;
import com.ssafy.peak.dto.news.NewsSearchRequestDto;
import com.ssafy.peak.exception.CustomException;
import com.ssafy.peak.exception.CustomExceptionType;
import com.ssafy.peak.repository.IdolNewsListByTimeRepository;
import com.ssafy.peak.repository.NewsRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Slf4j
@Transactional(readOnly = true)
public class IdolNewsListByTimeService {

	private static final int NEWS_REQUIRED_CNT = 4;
	private final IdolNewsListByTimeRepository idolNewsListByTimeRepository;
	private final NewsRepository newsRepository;

	@Transactional
	public void addIdolNewsList(
		IdolNewsListByTimeRequestDto idolNewsListByTimeRequestDto
	) {
		IdolNewsListByTime idolNewsList = idolNewsListByTimeRequestDto.toEntity();
		if (idolNewsListByTimeRepository.findByIdolAndDateTime(
			idolNewsList.getIdol(),
			idolNewsList.getDateTime()
		).isPresent()) {
			throw new CustomException(CustomExceptionType.IDOL_NEWS_ALREADY_EXIST);
		}
		idolNewsListByTimeRepository.insert(idolNewsList);
	}

	public Map<String, Object> findIdolKeywordRelatedElements(String idol) {
		IdolNewsListByTime idolNewsList =
			idolNewsListByTimeRepository
				.findRecentAndNotEmptyNewsListAndNotEmptyKeywordCounterByIdol(idol)
				.orElseThrow(() -> new CustomException(CustomExceptionType.IDOL_NEWS_NOT_FOUND));

		List<String> keywordList =
			idolNewsList
				.getKeywordCounter()
				.entrySet()
				.stream()
				.sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
				.map(Map.Entry::getKey)
				.limit(5)
				.collect(Collectors.toList());

		int keywordCnt = keywordList.size();
		List<KeywordRelatedWordCounterResponseDto> keywordRelatedWordCounterList = new ArrayList<>(keywordCnt);
		List<KeywordRelatedNewsListResponseDto> keywordRelatedNewsListCollection = new ArrayList<>(keywordCnt);

		for (String keyword : keywordList) {
			keywordRelatedWordCounterList.add(
				new KeywordRelatedWordCounterResponseDto(
					keyword,
					new HashMap<>()
				)
			);
			keywordRelatedNewsListCollection.add(
				new KeywordRelatedNewsListResponseDto(
					keyword,
					new ArrayList<>()
				)
			);
		}

		for (int keywordIdx = 0; keywordIdx < keywordCnt; keywordIdx++) {
			String keyword = keywordList.get(keywordIdx);
			List<News> newsList = new ArrayList<>();
			Map<String, Integer> wordCounter
				= keywordRelatedWordCounterList.get(keywordIdx).getWordCounter();
			for (News news : idolNewsList.getNewsList()) {
				if (news.getWordCounter().containsKey(keyword)) {
					news.getWordCounter().forEach(
						(key, value) -> wordCounter.merge(key, value, Integer::sum)
					);
					newsList.add(news);
				}
			}
			newsList.sort((o1, o2) -> {
				int frequencyA = o1.getWordCounter().get(keyword);
				int frequencyB = o2.getWordCounter().get(keyword);
				if (frequencyA == frequencyB)
					return 0;
				return frequencyA > frequencyB ? -1 : 1;
			});
			int newsCnt = Math.min(NEWS_REQUIRED_CNT, newsList.size());
			for (int newsIdx = 0; newsIdx < newsCnt; newsIdx++) {
				keywordRelatedNewsListCollection
					.get(keywordIdx)
					.getNewsList()
					.add(NewsResponseDto.of(newsList.get(newsIdx)));
			}
		}

		Map<String, Object> idolKeywordRelatedElements = new HashMap<>();
		idolKeywordRelatedElements.put("wordCounter", keywordRelatedWordCounterList);
		idolKeywordRelatedElements.put("newsList", keywordRelatedNewsListCollection);
		return idolKeywordRelatedElements;
	}

	public void addNewsToIdolNewsList(NewsSearchRequestDto newsSearchRequestDto) {
		long index = newsSearchRequestDto.getIndex();
		LocalDateTime dateTime = newsSearchRequestDto.getDateTime();
		String idol = newsSearchRequestDto.getIdol();
		News news = newsRepository
			.findByIndexAndDateTimeAndIdol(index, dateTime, idol)
			.orElseThrow(() -> new CustomException(CustomExceptionType.NEWS_NOT_FOUND));
		IdolNewsListByTime idolNewsList =
			idolNewsListByTimeRepository
				.findByIdolAndDateTime(idol, dateTime)
				.orElseThrow(() -> new CustomException(CustomExceptionType.IDOL_NEWS_NOT_FOUND));
		idolNewsList.getNewsList().add(news);
	}

	public void addKeywordCounterToIdolNewsList(KeywordCounterRequestDto keywordCounterRequestDto) {
		LocalDateTime dateTime = keywordCounterRequestDto.getDateTime();
		String idol = keywordCounterRequestDto.getIdol();
		Map<String, Integer> keywordCounter = keywordCounterRequestDto.getKeywordCounter();
		IdolNewsListByTime idolNewsList =
			idolNewsListByTimeRepository
				.findByIdolAndDateTime(idol, dateTime)
				.orElseThrow(() -> new CustomException(CustomExceptionType.IDOL_NEWS_NOT_FOUND));
		idolNewsList.getKeywordCounter().putAll(keywordCounter);
	}
}
