package com.ssafy.peak.dto.idol.response;

import com.ssafy.peak.domain.Idol.SnsLink;

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
public class IdolDetailResponseDto {
	private String idol;
	private SnsLink snsLink;
	private Boolean interest;
}
