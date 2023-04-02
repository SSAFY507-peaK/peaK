package com.ssafy.peak.dto.idol;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IdolRankByDayResponseDto {
    private List<IdolRankResponseDto> rankWeek;
    private IdolRankResponseDto current;
}
