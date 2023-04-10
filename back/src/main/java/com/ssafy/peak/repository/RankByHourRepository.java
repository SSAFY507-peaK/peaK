package com.ssafy.peak.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.peak.domain.rank.RankByHour;

@Repository
public interface RankByHourRepository extends MongoRepository<RankByHour, String> {

	// 모든 아이돌 차트
	// 특정 날짜 시간대의 랭킹 정보
	Optional<RankByHour> findByDateTime(LocalDateTime dateTime);

	// 특정 아이돌의 현재 랭킹
	Optional<RankByHour> findByDateTimeAndIdolsIdol(LocalDateTime dateTime, String idol);

	RankByHour insert(RankByHour entity);
}
