package com.ssafy.peak.domain.news;

import java.time.LocalDateTime;
import java.util.List;
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
@Document(collection = "idol_news_list_by_time")
public class IdolNewsListByTime {

	@Id
	private String id;
	private String idol;
	private LocalDateTime dateTime;
	private Map<String, Integer> keywordCounter;
	private List<News> newsList;
}
