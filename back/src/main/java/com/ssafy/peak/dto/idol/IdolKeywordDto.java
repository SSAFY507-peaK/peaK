package com.ssafy.peak.dto.idol;

import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IdolKeywordDto {
    private String keyword;
    private int value;
    private List<String> subLinks;
    private List<Map<String,Integer>> subKeywords;

}
