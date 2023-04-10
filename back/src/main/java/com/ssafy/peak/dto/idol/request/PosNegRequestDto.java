package com.ssafy.peak.dto.idol.request;

import static com.ssafy.peak.util.Utils.*;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.peak.domain.PosNeg;

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
public class PosNegRequestDto {
	@JsonProperty("date")
	private LocalDateTime date;
	@JsonProperty("idol")
	private String idol;
	@JsonProperty("pos_neg_score")
	private int posNegScore;

	public PosNeg toEntity() {
		return PosNeg
			.builder()
			.date(dateTimeToDate(date))
			.idol(idol)
			.posNegScore(posNegScore)
			.build();
	}
}
