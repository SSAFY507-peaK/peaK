package com.ssafy.peak.dto.news;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewsListResponseDto {
    private List<TotalKeywordDto> keywords;
}
