package com.ssafy.peak.domain.news;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Document(collection = "idol_news_hour")
public class IdolNewsHour {
    @MongoId
    private String id;
    private String idol;
    private String date;
    private int hour;
    private List<Map<String, Integer>> popular_keywords;
    private List<News> news;
}
