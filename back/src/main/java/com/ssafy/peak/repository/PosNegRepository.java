package com.ssafy.peak.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.peak.domain.PosNeg;

@Repository
public interface PosNegRepository extends MongoRepository<PosNeg, String> {

	// 일주일 간의 긍부정
	@Query(" { date: { $gte: ?0, $lte: ?1 }, idol: ?2 } ")
	Optional<List<PosNeg>> findByIdolDateBetween(LocalDateTime startDateTime, LocalDateTime endDateTime, String idol);

	Optional<PosNeg> findByIdolAndDate(String idol, LocalDateTime date);

	PosNeg insert(PosNeg entity);

	// 특정 아이돌의 현시간 긍부정
	//    PosNeg findByDateAndIdol(LocalDateTime date, String idol);
}
