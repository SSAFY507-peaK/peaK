package com.ssafy.peak.domain.rank;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Document(collection = "rank_by_hour")
public class RankByHour {
    private LocalDateTime dateTime;
    private List<RankInfo> idols;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class RankInfo {
        private String idol;
        private int rank;
        private int score;
    }
}
