package com.ssafy.peak.dto.idol;

import com.ssafy.peak.domain.rank.RankByHour;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IdolListResponseDto {
    private List<String> idols;
}
