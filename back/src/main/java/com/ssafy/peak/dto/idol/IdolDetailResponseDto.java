package com.ssafy.peak.dto.idol;

import com.ssafy.peak.domain.Idol.SnsLink;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IdolDetailResponseDto {
    private String idol;
    private SnsLink snsLink;
    private Boolean interest;
}
