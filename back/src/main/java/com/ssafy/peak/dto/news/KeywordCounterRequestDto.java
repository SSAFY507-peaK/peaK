package com.ssafy.peak.dto.news;

import java.time.LocalDateTime;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class KeywordCounterRequestDto {

	@JsonProperty("date_time")
	private LocalDateTime dateTime;

	@JsonProperty("idol")
	String idol;

	@JsonProperty("keyword_counter")
	Map<String, Integer> keywordCounter;
}
