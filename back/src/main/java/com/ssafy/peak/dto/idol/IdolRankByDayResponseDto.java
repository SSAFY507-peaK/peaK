package com.ssafy.peak.dto.idol;

import com.ssafy.peak.dto.rank.RankResponseDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IdolRankByDayResponseDto {
    private List<RankResponseDto> rankWeek;
    private RankResponseDto current;
}
