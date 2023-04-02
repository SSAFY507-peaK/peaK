package com.ssafy.peak.dto.rank;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TotalRankListResponseDto {
    private List<TotalRankDto> ranksByHour;
}
