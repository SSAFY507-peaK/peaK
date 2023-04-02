package com.ssafy.peak.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ssafy.peak.domain.Idol.Idol;

public interface IdolRepository extends MongoRepository<Idol, String> {

	List<Idol> findByIdolIn(List<String> idolIds);
}
