package com.ssafy.peak.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.peak.entity.User;

@Repository
public interface UserRepository extends MongoRepository<User, Long> {
	User findByEmail(String email);
}
