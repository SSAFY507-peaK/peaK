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
public class WordCounterRequestDto {

	@JsonProperty("index")
	long index;

	@JsonProperty("date_time")
	private LocalDateTime dateTime;

	@JsonProperty("idol")
	String idol;

	@JsonProperty("word_counter")
	Map<String, Integer> wordCounter;
}
