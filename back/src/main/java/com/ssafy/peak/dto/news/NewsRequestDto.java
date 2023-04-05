package com.ssafy.peak.dto.news;

import java.time.LocalDateTime;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.peak.domain.news.News;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Builder
@Getter
@NoArgsConstructor
public class NewsRequestDto {

	@JsonProperty("idol")
	private String idol;

	@JsonProperty("index")
	private long index;

	@JsonProperty("date_time")
	private LocalDateTime dateTime;

	@JsonProperty("press")
	private String press;

	@JsonProperty("title")
	private String title;

	@JsonProperty("word_counter")
	private Map<String, Integer> wordCounter;

	@JsonProperty("summary")
	private String summary;

	@JsonProperty("link")
	private String link;

	@JsonProperty("thumbnail_link")
	private String thumbnailLink;

	public News toEntity() {
		return News.builder()
			.idol(idol)
			.index(index)
			.dateTime(dateTime)
			.press(press)
			.title(title)
			.wordCounter(wordCounter)
			.summary(summary)
			.link(link)
			.thumbnailLink(thumbnailLink)
			.build();
	}
}
