package com.ssafy.peak.dto.idol.response;

import java.util.List;

import com.ssafy.peak.dto.idol.PosNegDto;

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
public class IdolPosNegResponseDto {
	private List<PosNegDto> posNegWeek;
}
