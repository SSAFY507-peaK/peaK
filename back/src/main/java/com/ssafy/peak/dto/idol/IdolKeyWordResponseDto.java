package com.ssafy.peak.dto.idol;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IdolKeyWordResponseDto {
    private List<String> links;
    private List<IdolKeywordDto> keywords;
}
