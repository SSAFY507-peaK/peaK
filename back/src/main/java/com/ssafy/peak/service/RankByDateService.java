package com.ssafy.peak.service;

import static com.ssafy.peak.util.Utils.*;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.peak.domain.rank.RankByDate;
import com.ssafy.peak.dto.idol.response.IdolRankByDayResponseDto;
import com.ssafy.peak.dto.rank.RankByDateRequestDto;
import com.ssafy.peak.dto.rank.RankResponseDto;
import com.ssafy.peak.exception.CustomException;
import com.ssafy.peak.exception.CustomExceptionType;
import com.ssafy.peak.repository.RankByDateRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class RankByDateService {
	private final RankByDateRepository rankByDateRepository;
	private final RankByHourService rankByHourService;

	public IdolRankByDayResponseDto rankByIdolWeekly(String idol) {
		LocalDateTime now = LocalDateTime.now();
		LocalDateTime startDate = dateTimeToDate(now).minusDays(7);
		LocalDateTime endDate = dateTimeToDate(now).minusDays(1);

		List<RankResponseDto> rankList = rankByDateRepository.findByDateTimeBetween(startDate, endDate, idol)
			.orElseThrow(() -> new CustomException(CustomExceptionType.NO_CONTENT));

		RankResponseDto rankByHourByIdol = rankByHourService.rankByIdol(idol);

		IdolRankByDayResponseDto dto = IdolRankByDayResponseDto.builder()
			.rankWeek(rankList)
			.current(rankByHourByIdol)
			.build();
		return dto;
	}

	public void insertRankByDate(RankByDateRequestDto dto) {
		// System.out.println(dto);
		RankByDate entity = dto.toEntity();
		System.out.println(entity);
		if (rankByDateRepository.findByDate(entity.getDate()).isPresent()) {
			throw new CustomException(CustomExceptionType.ALREADY_EXIST);
		}
		rankByDateRepository.insert(entity);
	}
}
