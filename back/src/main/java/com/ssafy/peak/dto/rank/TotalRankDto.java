package com.ssafy.peak.dto.rank;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TotalRankDto {
    private int rank;
    private String idol;
    private int score;
    private int diff;
}
