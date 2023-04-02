package com.ssafy.peak.dto.idol;

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
