package com.ssafy.peak.service;

import org.springframework.stereotype.Service;

import com.ssafy.peak.dto.idol.IdolListResponseDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class InterestService {

	/**
	 * 나의 관심 아이돌 리스트
	 */
	public IdolListResponseDto getInterestIdols() {

		return IdolListResponseDto.builder().build();
	}

	/**
	 * 관심 아이돌 등록
	 */
	public void addInterestIdol(String idolName) {
	}

	/**
	 * 관심 아이돌 삭제
	 */
	public void deleteInterestIdol(String idolName) {
	}
}
