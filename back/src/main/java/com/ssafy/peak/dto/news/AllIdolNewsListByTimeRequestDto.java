package com.ssafy.peak.dto.news;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.peak.domain.news.AllIdolNewsListByTime;
import com.ssafy.peak.domain.news.News;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Builder
@Getter
@NoArgsConstructor
public class AllIdolNewsListByTimeRequestDto {

	@JsonProperty("date_time")
	private LocalDateTime dateTime;

	@JsonProperty("popular_keywords")
	private Map<String, Integer> keywordCounter;

	@JsonProperty("news_list")
	private List<News> newsList;

	public AllIdolNewsListByTime toEntity() {
		return AllIdolNewsListByTime
			.builder()
			.dateTime(dateTime)
			.keywordCounter(keywordCounter)
			.newsList(newsList)
			.build();
	}
}
