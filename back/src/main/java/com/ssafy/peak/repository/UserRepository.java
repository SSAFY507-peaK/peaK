package com.ssafy.peak.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.peak.domain.User;

@Repository
public interface UserRepository extends MongoRepository<User, Long> {
	Optional<User> findByEmail(String email);

	Optional<User> findByNickname(String nickname);
}
