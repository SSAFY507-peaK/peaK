package com.ssafy.peak.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ssafy.peak.domain.Idol.Idol;
import org.springframework.stereotype.Repository;

@Repository
public interface IdolRepository extends MongoRepository<Idol, String> {

	List<Idol> findByIdolIn(List<String> idols);
	// 아이돌 리스트, 아이돌 상세정보
	List<Idol> findAll();
}
