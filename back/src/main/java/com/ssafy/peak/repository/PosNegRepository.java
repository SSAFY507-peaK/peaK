package com.ssafy.peak.repository;

import com.ssafy.peak.domain.PosNeg;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
@Repository
public interface PosNegRepository extends MongoRepository<PosNeg, String> {

    // 일주일 간의 긍부정
    @Query(" { date: { $gte: ?0, $lte: ?1 }, idol: ?2 } ")
    List<PosNeg> findByIdolDateBetween(LocalDateTime startDateTime, LocalDateTime endDateTime, String idol);

    // 특정 아이돌의 현시간 긍부정
//    PosNeg findByDateAndIdol(LocalDateTime date, String idol);
}
