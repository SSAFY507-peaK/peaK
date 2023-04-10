package com.ssafy.peak.dto.news;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.peak.domain.news.IdolNewsListByTime;
import com.ssafy.peak.domain.news.News;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Builder
@Getter
@NoArgsConstructor
public class IdolNewsListByTimeRequestDto {

	@JsonProperty("idol")
	private String idol;

	@JsonProperty("date_time")
	private LocalDateTime dateTime;

	@JsonProperty("keyword_counter")
	private Map<String, Integer> keywordCounter;

	@JsonProperty("news_list")
	private List<News> newsList;

	public IdolNewsListByTime toEntity() {
		return IdolNewsListByTime
			.builder()
			.idol(idol)
			.dateTime(dateTime)
			.keywordCounter(keywordCounter)
			.newsList(newsList)
			.build();
	}
}
