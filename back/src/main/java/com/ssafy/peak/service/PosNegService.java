package com.ssafy.peak.service;

import static com.ssafy.peak.util.Utils.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.peak.domain.PosNeg;
import com.ssafy.peak.dto.idol.PosNegDto;
import com.ssafy.peak.dto.idol.request.PosNegRequestDto;
import com.ssafy.peak.dto.idol.response.IdolPosNegResponseDto;
import com.ssafy.peak.exception.CustomException;
import com.ssafy.peak.exception.CustomExceptionType;
import com.ssafy.peak.repository.PosNegRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class PosNegService {
	private final PosNegRepository posNegRepository;

	// 3 2 1 31 30 29 28 27
	public IdolPosNegResponseDto posNegWeeklyByIdol(String idol) {
		LocalDateTime now = LocalDateTime.now();
		LocalDateTime startDateTime = dateTimeToDate(now).minusDays(7);
		LocalDateTime endDateTime = dateTimeToDate(now).minusDays(1);
		List<PosNeg> posNegList = posNegRepository.findByIdolDateBetween(startDateTime, endDateTime, idol)
			.orElseThrow(() -> new CustomException(CustomExceptionType.NO_CONTENT));

		List<PosNegDto> posNegWeek = new ArrayList<>();
		for (PosNeg posNeg : posNegList) {
			posNegWeek.add(PosNegDto.of(posNeg));
		}

		//        posNeg currentPosNeg = posNegRepository.findByDateAndIdol(endDateTime, idol);

		IdolPosNegResponseDto dto = IdolPosNegResponseDto.builder()
			.posNegWeek(posNegWeek)
			.build();
		return dto;
	}

	public void insertPosNeg(PosNegRequestDto dto) {
		PosNeg entity = dto.toEntity();
		if (posNegRepository.findByDate(entity.getDate()).isPresent()) {
			throw new CustomException(CustomExceptionType.ALREADY_EXIST);
		}
		posNegRepository.insert(entity);
	}
}


