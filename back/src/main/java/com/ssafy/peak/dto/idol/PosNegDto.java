package com.ssafy.peak.dto.idol;

import com.ssafy.peak.domain.PosNeg;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PosNegDto {
    private int pos;
    private int neg;

    public static PosNegDto of(PosNeg posNeg){
        return PosNegDto.builder()
                .pos(posNeg.getPosNegScore())
                .neg(100 - posNeg.getPosNegScore())
                .build();
    }
}
