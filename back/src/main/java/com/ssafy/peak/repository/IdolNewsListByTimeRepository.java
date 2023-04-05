package com.ssafy.peak.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.peak.domain.news.IdolNewsListByTime;

@Repository
public interface IdolNewsListByTimeRepository extends MongoRepository<IdolNewsListByTime, String> {

	Optional<IdolNewsListByTime> findByIdolAndDateTime(String idol, LocalDateTime dateTime);

	@Aggregation(pipeline = {
		"{$match: {idol: ?0, news_list: {$ne: []}, keyword_counter: {$ne: {}}}}",
		"{$sort: {date_time: -1}}",
		"{$limit: 1}"
	})
	Optional<IdolNewsListByTime> findRecentAndNotEmptyNewsListAndNotEmptyKeywordCounterByIdol(String idol);
}
