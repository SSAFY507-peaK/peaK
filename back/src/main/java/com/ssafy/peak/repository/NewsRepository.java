package com.ssafy.peak.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.peak.domain.news.News;

@Repository
public interface NewsRepository extends MongoRepository<News, String> {

	Optional<News> findByIndex(long index);

	Optional<News> findByIndexAndIdol(long index, String idol);
}
