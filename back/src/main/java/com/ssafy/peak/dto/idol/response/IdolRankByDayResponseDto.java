package com.ssafy.peak.dto.idol.response;

import java.util.List;

import com.ssafy.peak.dto.rank.RankResponseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IdolRankByDayResponseDto {
	private List<RankResponseDto> rankWeek;
	private RankResponseDto current;
}
