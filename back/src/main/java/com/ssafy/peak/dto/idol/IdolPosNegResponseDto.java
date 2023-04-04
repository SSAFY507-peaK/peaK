package com.ssafy.peak.dto.idol;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IdolPosNegResponseDto {
    private List<PosNegDto> posNegWeek;
}
