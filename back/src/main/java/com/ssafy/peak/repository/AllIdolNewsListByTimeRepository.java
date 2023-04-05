package com.ssafy.peak.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.peak.domain.news.AllIdolNewsListByTime;

@Repository
public interface AllIdolNewsListByTimeRepository extends MongoRepository<AllIdolNewsListByTime, String> {

	Optional<AllIdolNewsListByTime> findByDateTime(LocalDateTime dateTime);

	@Aggregation(pipeline = {
		"{$match: {news_list: {$ne: []}, keyword_counter: {$ne: {}}}}",
		"{$sort: {date_time: -1}}",
		"{$limit: 1}"
	})
	Optional<AllIdolNewsListByTime> findRecentAndNotEmptyNewsListAndNotEmptyKeywordCounter();
}
