package com.ssafy.peak.domain;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Document(collection = "pos_neg")
public class PosNeg {
    private LocalDateTime date;
    private String idol;
    private int posNegScore;
}
