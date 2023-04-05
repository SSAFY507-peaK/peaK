package com.ssafy.peak.dto.news;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class KeywordRelatedWordCounterResponseDto {

	private String keyword;

	private Map<String, Integer> wordCounter;
}
