package com.ssafy.peak.repository;

import com.ssafy.peak.domain.Idol.Idol;
import com.ssafy.peak.domain.rank.RankByDate;
import com.ssafy.peak.domain.rank.RankByHour;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RankByHourRepository extends MongoRepository<RankByHour, String> {
    // Top 8
    List<RankByHour.RankInfo> findTop8ByOrderByScoreAsc();

    // 모든 아이돌 차트
    // 특정 날짜 시간대의 랭킹 정보
    RankByHour findByDateTime(LocalDateTime dateTime);

    // 특정 아이돌의 현재 랭킹
    RankByHour findByDateAndIdolsIdol(LocalDateTime dateTime, String idol);

}
