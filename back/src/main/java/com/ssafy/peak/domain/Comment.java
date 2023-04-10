package com.ssafy.peak.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

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
	private String email;
	private String idol;
	private LocalDateTime dateTime;
	private String content;
	// private String nickname..?
}
