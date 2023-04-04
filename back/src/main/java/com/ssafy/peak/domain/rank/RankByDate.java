package com.ssafy.peak.domain.rank;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Document(collection = "rank_by_date")
public class RankByDate {
    private LocalDateTime date;
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
