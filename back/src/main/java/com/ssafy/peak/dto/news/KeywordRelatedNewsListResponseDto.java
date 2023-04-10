package com.ssafy.peak.dto.news;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class KeywordRelatedNewsListResponseDto {

	private String keyword;

	private List<NewsResponseDto> newsList;
}
