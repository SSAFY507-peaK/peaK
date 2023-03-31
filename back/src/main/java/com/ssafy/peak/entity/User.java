package com.ssafy.peak.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.ssafy.peak.enums.Role;
import com.ssafy.peak.enums.UserInfoProvider;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collation = "user")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
	@Id
	private long id;
	private String email;
	private String nickname;
	private UserInfoProvider provider;
	private Role role;
	private LocalDateTime lastLoginDateTime;
	private int favoriteIdolsCnt;
	private Idols[] idols;

	@Document(collation = "idols")
	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	class Idols {
		private String idol;
		private String like;
		private LocalDateTime modifiedDataTime;
		private int pageClicksCnt;
		private int pageStaySec;
		private int commentsCnt;
	}

}
