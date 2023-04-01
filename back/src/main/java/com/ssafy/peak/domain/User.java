package com.ssafy.peak.domain;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.ssafy.peak.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Document(collection = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class User {
	@Id
	private String id;
	private String email;
	private Role role;
	private String nickname;
	private String provider;
	private LocalDateTime lastLoginDatetime;
	private int favoriteIdolsCnt;
	private List<Idol> idols;

	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	@ToString
	public static class Idol {
		@Id
		private String id;
		private String idol;
		private boolean like;
		private LocalDateTime modifiedDatetime;
		private int pageClicksCnt;
		private int pageStaySec;
		private int commentsCnt;
	}
}
