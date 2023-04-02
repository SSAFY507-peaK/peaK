package com.ssafy.peak.dto.idol;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IdolRankResponseDto {
    private int rank;
    private int score;
}
