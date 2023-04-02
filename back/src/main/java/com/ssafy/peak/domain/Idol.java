package com.ssafy.peak.domain;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Document(collection = "idol")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Idol {
	@Id
	private String id;
	private String idol;
	private List<String> notations;
	private long fanCount;
	private long totalPageClicksCount;
	private long totalPageStaySeconds;
	private long totalCommentsCount;
	private SnsLink snsLink;

	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	public static class SnsLink {
		private String youtube;
		private String twitter;
		private String instagram;
	}
}


