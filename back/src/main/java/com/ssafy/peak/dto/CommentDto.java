package com.ssafy.peak.dto;

import java.time.LocalDateTime;

import com.ssafy.peak.domain.Comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDto {
	private String nickname;
	private LocalDateTime datetime;
	private String content;

	public static CommentDto of(Comment comment, String nickname) {
		return CommentDto.builder()
			.nickname(nickname)
			.content(comment.getContent())
			.datetime(comment.getDateTime())
			.build();
	}

}
