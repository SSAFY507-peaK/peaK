package com.ssafy.peak.service;

import static com.ssafy.peak.util.Utils.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.peak.domain.rank.RankByHour;
import com.ssafy.peak.dto.idol.response.IdolListResponseDto;
import com.ssafy.peak.dto.rank.RankByHourRequestDto;
import com.ssafy.peak.dto.rank.RankDiffDto;
import com.ssafy.peak.dto.rank.RankResponseDto;
import com.ssafy.peak.dto.rank.TotalRankListResponseDto;
import com.ssafy.peak.exception.CustomException;
import com.ssafy.peak.exception.CustomExceptionType;
import com.ssafy.peak.repository.RankByHourRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class RankByHourService {
	private final RankByHourRepository rankByHourRepository;

	// Top 8
	public IdolListResponseDto top(LocalDateTime dateTime) {
		dateTime = dateTimeToHour(dateTime);
		RankByHour rankByHour = rankByHourRepository.findByDateTime(dateTime)
			.orElseThrow(() -> new CustomException(CustomExceptionType.NO_CONTENT));
		List<String> idols = new ArrayList<>();
		int count = 0;
		for (RankByHour.RankInfo info : rankByHour.getIdols()) {
			if (count == 8)
				break;
			idols.add(info.getIdol());
			count++;
		}

		IdolListResponseDto dto = IdolListResponseDto.builder().idols(idols).build();
		return dto;
	}

	// 모든 아이돌 차트
	// 한시간 전과 비교
	// 레디스에 넣으면 좋을..
	public TotalRankListResponseDto list(LocalDateTime dateTime) {
		LocalDateTime prevHour = dateTimeToHour(dateTime.minusHours(2));
		dateTime = dateTimeToHour(dateTime.minusHours(1));

		RankByHour rankByHour = rankByHourRepository.findByDateTime(dateTime)
			.orElseThrow(() -> new CustomException(CustomExceptionType.NO_CONTENT));
		;
		RankByHour rankByPrevHour = rankByHourRepository.findByDateTime(prevHour)
			.orElseThrow(() -> new CustomException(CustomExceptionType.NO_CONTENT));
		;

		HashMap<String, Integer> rankDiffMap = new HashMap<>();

		// 현재 아이돌 랭킹 저장
		for (RankByHour.RankInfo info : rankByHour.getIdols()) {
			rankDiffMap.put(info.getIdol(), info.getRank());
		}

		// 이전 아이돌 랭킹과의 차이를 저장
		for (RankByHour.RankInfo info : rankByPrevHour.getIdols()) {
			String idol = info.getIdol();
			int prevRank = info.getRank();
			rankDiffMap.put(idol, prevRank - rankDiffMap.get(idol));
		}
		// 현재 아이돌 랭킹정보와 변동을 저장
		List<RankDiffDto> rankDiffDtoList = new ArrayList<>();
		for (RankByHour.RankInfo info : rankByHour.getIdols()) {
			RankDiffDto rankDiffDto = RankDiffDto.builder()
				.idol(info.getIdol())
				.rank(info.getRank())
				.score(info.getScore())
				.diff(rankDiffMap.get(info.getIdol()))
				.build();
			rankDiffDtoList.add(rankDiffDto);
		}
		TotalRankListResponseDto dto = TotalRankListResponseDto.builder().ranksByHour(rankDiffDtoList).build();
		return dto;
	}

	public RankResponseDto rankByIdol(String idol) {
		LocalDateTime dateTime = LocalDateTime.now();
		// 갱신된 시간으로 검색
		LocalDateTime hourDateTime = dateTimeToHour(dateTime);
		RankByHour rankByHour = rankByHourRepository.findByDateTimeAndIdolsIdol(hourDateTime, idol)
			.orElseThrow(() -> new CustomException(CustomExceptionType.NO_CONTENT));

		// 뭔가 이상해서 안나오면 100으로,,
		int rank = 100;
		int score = 100;
		for (RankByHour.RankInfo info : rankByHour.getIdols()) {
			if (info.getIdol().equals(idol)) {
				rank = info.getRank();
				score = info.getScore();
			}
		}
		RankResponseDto dto = RankResponseDto.builder().idol(idol).rank(rank).score(score).build();
		return dto;
	}

	public void insertRankByHour(RankByHourRequestDto dto) {
		// System.out.println(dto);
		RankByHour entity = dto.toEntity();
		System.out.println(entity);
		if (rankByHourRepository.findByDateTime(entity.getDateTime()).isPresent()) {
			throw new CustomException(CustomExceptionType.ALREADY_EXIST);
		}
		rankByHourRepository.insert(entity);
	}
}
