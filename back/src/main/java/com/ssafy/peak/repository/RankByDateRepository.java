package com.ssafy.peak.repository;

import com.ssafy.peak.domain.rank.RankByDate;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RankByDateRepository extends MongoRepository<RankByDate, String> {
    // 특정 아이돌의 일주일 간 랭킹 정보
//    @Query("{'date_time' : {$gte: ?0, $lte: ?1} }")
    @Aggregation(pipeline = {
            "{ $match: { date: { $gte: ?0, $lte: ?1 } } }",
            "{ $project: { filteredIdols: { $filter: { input: '$idols', as: 'idol', cond: { $eq: [ '$$idol.idol', ?2 ] } } } } }",
            "{ $unwind: '$filteredIdols' }",
            "{ $replaceRoot: { newRoot: '$filteredIdols' } }"
    })
    List<RankByDate> findByDateTimeBetween(LocalDateTime startDateTime, LocalDateTime endDateTime, String Idol);

}
