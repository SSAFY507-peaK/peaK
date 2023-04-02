package com.ssafy.peak.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Document(collection = "comment")
public class Comment {
    @Id
    private String id;
    private String userId;
    private String idol;
    private LocalDateTime dateTime;
    private String content;
    // private String nickname..?
}
