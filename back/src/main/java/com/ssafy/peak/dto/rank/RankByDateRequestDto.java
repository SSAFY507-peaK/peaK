package com.ssafy.peak.dto.rank;

import static com.ssafy.peak.util.Utils.*;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.peak.domain.rank.RankByDate;

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
public class RankByDateRequestDto {
	@JsonProperty("date")
	private LocalDateTime date;
	@JsonProperty("idols")
	private List<RankByDate.RankInfo> idols;

	public RankByDate toEntity() {
		return RankByDate.builder()
			.date(dateTimeToDate(date))
			.idols(idols)
			.build();
	}

}
