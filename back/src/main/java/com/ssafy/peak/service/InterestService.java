package com.ssafy.peak.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.peak.domain.Idol.Idol;
import com.ssafy.peak.domain.User;
import com.ssafy.peak.dto.idol.response.IdolListResponseDto;
import com.ssafy.peak.exception.CustomException;
import com.ssafy.peak.exception.CustomExceptionType;
import com.ssafy.peak.repository.CommentRepository;
import com.ssafy.peak.repository.IdolRepository;
import com.ssafy.peak.repository.UserRepository;
import com.ssafy.peak.util.SecurityUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class InterestService {

	private final SecurityUtil securityUtil;
	private final UserRepository userRepository;
	private final IdolRepository idolRepository;
	private final CommentRepository commentRepository;

	/**
	 * 나의 관심 아이돌 리스트
	 */
	public IdolListResponseDto getInterestIdols() {

		// user 인증 정보 확인 후 db 조회
		User user = securityUtil.getCurrentUserId()
			.flatMap(userRepository::findById)
			.orElseThrow(() -> new CustomException(CustomExceptionType.USER_NOT_FOUND));

		log.info("user: {}", user);

		List<User.Idol> interestIdols = user.getIdols();
		List<String> interestIdolNameList = new ArrayList<>();
		for (int i = 0; i < interestIdols.size(); i++) {
			interestIdolNameList.add(interestIdols.get(i).getIdol());
		}

		log.info("interestIdolNameList: {}", interestIdolNameList.toString());

		return IdolListResponseDto.builder()
			.idols(interestIdolNameList)
			.build();
	}

	/**
	 * 관심 아이돌 등록
	 */
	@Transactional
	public void addInterestIdol(String idolName) {

		// user 인증 정보 확인 후 db 조회
		User user = securityUtil.getCurrentUserId()
			.flatMap(userRepository::findById)
			.orElseThrow(() -> new CustomException(CustomExceptionType.USER_NOT_FOUND));

		List<User.Idol> idols = user.getIdols();
		int interestIdolCount = getInterestIdolCount(idols);
		// 관심 아이돌 최대 5팀 제한 체크
		if (interestIdolCount >= 5) {
			throw new CustomException(CustomExceptionType.TO_MUCH_INTEREST);
		}
		// 아이돌 이름으로 db 조회
		Idol idol = idolRepository.findByIdol(idolName)
			.orElseThrow(() -> new CustomException(CustomExceptionType.IDOL_NOT_FOUND));

		// 관심 아이돌 기록이 있는지 체크
		int existIdol = -1;
		for (int i = 0; i < idols.size(); i++) {
			if (idols.get(i).getIdol().equals(idol.getIdol())) {
				existIdol = i;
			}
		}
		boolean alreadyLove = false;
		if (existIdol > 0) {
			// 관심 기록이 있고
			if (!idols.get(existIdol).isLike()) {
				// 관심 기록이 false 상태이면 기록 갱신
				idols.get(existIdol).setLike(true);
				idols.get(existIdol).setModifiedDatetime(LocalDateTime.now());

			} else {
				// 관심 기록이 true 상태이면 예외 처리
				throw new CustomException(CustomExceptionType.ALREADY_LOVE);
			}
		} else {
			// 관심 기록이 없으면 정보를 생성해서 넣기

			// 내가 해당 아이돌에게 쓴 comment 조회
			int commentsCount = commentRepository.countByEmailAndIdol(user.getEmail(), idol.getIdol());

			log.info("commentsCount: {}", commentsCount);

			User.Idol interestIdol = User.Idol.builder()
				.idol(idol.getIdol())
				.like(true)
				.modifiedDatetime(LocalDateTime.now())
				.commentsCnt(commentsCount)
				.build();
			// 나의 관심 아이돌 리스트에 추가
			idols.add(interestIdol);
		}

		// 나의 관심 아이돌 정보 갱신
		user.setFavoriteIdolsCnt(interestIdolCount + 1);
		user.setIdols(idols);

		// 아이돌의 총 팬 수 증가
		idol.setFanCount(idol.getFanCount() + 1);

		// db 저장
		userRepository.save(user);
		idolRepository.save(idol);
	}

	/**
	 * 관심 아이돌 삭제
	 */
	@Transactional
	public void deleteInterestIdol(String idolName) {

		// user 인증 정보 확인 후 db 조회
		User user = securityUtil.getCurrentUserId()
			.flatMap(userRepository::findById)
			.orElseThrow(() -> new CustomException(CustomExceptionType.USER_NOT_FOUND));

		List<User.Idol> idols = user.getIdols();
		int interestIdolCount = getInterestIdolCount(idols);
		// 관심 아이돌 최소 1팀 제한 체크
		if (interestIdolCount <= 1) {
			throw new CustomException(CustomExceptionType.TO_LITTLE_INTEREST);
		}
		// 아이돌 이름으로 db 조회
		Idol idol = idolRepository.findByIdol(idolName)
			.orElseThrow(() -> new CustomException(CustomExceptionType.IDOL_NOT_FOUND));

		// 관심 아이돌 기록이 있는지 체크
		int existIdol = -1;
		for (int i = 0; i < idols.size(); i++) {
			if (idols.get(i).getIdol().equals(idol.getIdol())) {
				existIdol = i;
			}
		}
		if (existIdol >= 0) {
			// 관심 기록이 있고
			if (idols.get(existIdol).isLike()) {
				// 관심 기록이 true 상태이면 관심 false
				idols.get(existIdol).setLike(false);
				idols.get(existIdol).setModifiedDatetime(LocalDateTime.now());

				// 나의 관심 아이돌 정보 갱신
				user.setFavoriteIdolsCnt(interestIdolCount - 1);
				user.setIdols(idols);

				// 아이돌의 총 팬 수 감소
				idol.setFanCount(idol.getFanCount() - 1);

				// db 저장
				userRepository.save(user);
				idolRepository.save(idol);
			} else {
				// 관심 기록이 false 상태이면 예외 처리
				throw new CustomException(CustomExceptionType.ALREADY_HATE);
			}
		} else {
			// 관심 기록이 없으면 관심 삭제 불가
			throw new CustomException(CustomExceptionType.DO_NOT_DELETE_INTEREST);
		}
	}

	/**
	 * 관심 아이돌인지 확인하기
	 */
	public boolean isInterestIdol(String idolName) {
		// user 인증 정보 확인 후 db 조회
		User user = securityUtil.getCurrentUserId()
			.flatMap(userRepository::findById)
			.orElseThrow(() -> new CustomException(CustomExceptionType.USER_NOT_FOUND));
		List<User.Idol> idols = user.getIdols();
		Boolean isInterest = false;

		for (User.Idol idol : idols) {
			if (idol.getIdol().equals(idolName)) {
				isInterest = true;
				break;
			}
		}
		return isInterest;
	}

	/**
	 * 나의 관심 아이돌의 수 세기
	 */
	private static int getInterestIdolCount(List<User.Idol> idols) {
		int interestIdolCount = 0;
		for (int i = 0; i < idols.size(); i++) {
			if (idols.get(i).isLike() == true) {
				interestIdolCount++;
			}
		}
		return interestIdolCount;
	}

}

