package com.ssafy.peak.domain.news;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import nonapi.io.github.classgraph.json.Id;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Document(collection = "news")
public class News {

	@Id
	private String id;
	private String idol;
	private long index;
	private LocalDateTime dateTime;
	private String press;
	private String title;
	private Map<String, Integer> wordCounter;
	private String summary;
	private String link;
	private String thumbnailLink;

	public void updateWordCounter(Map<String, Integer> wordCounter) {
		this.wordCounter = wordCounter;
	}
}
