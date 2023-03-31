package com.ssafy.peak.domain;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.peak.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

	@Id
	private long id;
	private String email;
	private Role role;
	private String nickname;
	private String provider;

	@JsonProperty("last_login_datetime")
	private LocalDateTime lastLoginDatetime;

	@JsonProperty("favorite_idols_cnt")
	private int favoriteIdolsCnt;

	private List<Idol> idols;

	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Idol {

		private String idol;
		private boolean like;

		@JsonProperty("modified_datetime")
		private LocalDateTime modifiedDatetime;

		@JsonProperty("page_clicks_cnt")
		private int pageClicksCnt;

		@JsonProperty("page_stay_sec")
		private int pageStaySec;

		@JsonProperty("comments_cnt")
		private int commentsCnt;
	}
}
