package com.ssafy.peak.domain.news;

import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class News {
    private int index;
    private String press;
    private String title;
    private List<Map<String,Integer>> counter;
    private String summary;
    private String link;
    private String thumbnailLink;
}
