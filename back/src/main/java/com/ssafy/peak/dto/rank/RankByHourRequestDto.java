package com.ssafy.peak.dto.rank;

import static com.ssafy.peak.util.Utils.*;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.peak.domain.rank.RankByHour;

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
public class RankByHourRequestDto {
	@JsonProperty("date_time")
	private LocalDateTime dateTime;
	@JsonProperty("idols")
	private List<RankByHour.RankInfo> idols;

	public RankByHour toEntity() {
		return RankByHour.builder()
			.dateTime(dateTimeToHour(dateTime))
			.idols(idols)
			.build();
	}

}
