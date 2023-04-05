package com.ssafy.peak.dto.news;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class NewsSearchRequestDto {

	@JsonProperty("index")
	private long index;

	@JsonProperty("date_time")
	private LocalDateTime dateTime;

	@JsonProperty("idol")
	private String idol;
}
