package com.ssafy.peak.dto.news;

import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TotalKeywordDto {
    private String keyword;
    private int value;
    private List<Map<String,Integer>> subKeywords;
}
