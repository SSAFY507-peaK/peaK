package com.ssafy.peak.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.peak.domain.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

	Optional<User> findByEmail(String email);

	Optional<User> findByNickname(String nickname);

	Optional<User> findByNicknameAndIdNot(String nickname, String id);

	@Query("{ 'id' : ?0, 'idols.idol' : ?1, 'idols.like' : ?2 }")
	List<User.Idol> findByIdAndIdols_IdolAndIdols_Like(String userId, String likedIdol, boolean like);
}
