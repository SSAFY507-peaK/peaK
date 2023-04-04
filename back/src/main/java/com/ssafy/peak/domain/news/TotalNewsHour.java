package com.ssafy.peak.domain.news;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Document(collection = "total_news_hour")
public class TotalNewsHour {
    @MongoId
    private String id;
    private LocalDateTime collectedDateTime;
    private int hour;
    private List<Map<String, Integer>> popular_keywords;
    private List<News> news;
}
