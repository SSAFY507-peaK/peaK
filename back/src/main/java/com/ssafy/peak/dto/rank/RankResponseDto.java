package com.ssafy.peak.dto.rank;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RankResponseDto {
    private int rank;
    private int score;
}
