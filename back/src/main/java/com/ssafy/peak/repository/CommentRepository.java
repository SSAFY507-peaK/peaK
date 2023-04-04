package com.ssafy.peak.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.peak.domain.Comment;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {

	int countByEmailAndIdol(String email, String idol);
}
