package com.ssafy.peak.dto.news;

import com.ssafy.peak.domain.news.News;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Builder
@Getter
@NoArgsConstructor
public class NewsResponseDto {

	private String press;

	private String title;

	private String summary;

	private String link;

	private String thumbnailLink;

	public static NewsResponseDto of(News news) {
		return NewsResponseDto.builder()
			.press(news.getPress())
			.title(news.getTitle())
			.summary(news.getSummary())
			.link(news.getLink())
			.thumbnailLink(news.getThumbnailLink())
			.build();
	}
}
