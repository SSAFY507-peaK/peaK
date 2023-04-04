package com.ssafy.peak.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.peak.domain.Idol.Idol;
import com.ssafy.peak.domain.User;
import com.ssafy.peak.dto.idol.IdolListResponseDto;
import com.ssafy.peak.exception.CustomException;
import com.ssafy.peak.exception.CustomExceptionType;
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

		// 관심 아이돌 최대 5팀 제한 체크
		if (user.getIdols().size() > 5) {
			throw new CustomException(CustomExceptionType.TO_MUCH_INTEREST);
		}
		// 아이돌 이름으로 db 조회
		Idol idol = idolRepository.findByIdol(idolName)
			.orElseThrow(() -> new CustomException(CustomExceptionType.IDOL_NOT_FOUND));

		// 관심 아이돌 정보
		User.Idol interestIdol = User.Idol.builder()
			.idol(idol.getIdol())
			.like(true)
			.modifiedDatetime(LocalDateTime.now())
			// .pageClicksCnt()
			// .pageStaySec()
			// .commentsCnt()
			.build();

		// 나의 관심 아이돌 리스트에 추가하고 나의 관심 아이돌 수 갱신
		user.getIdols().add(interestIdol);
		user.setFavoriteIdolsCnt(user.getIdols().size());

		// 아이돌의 총 팬 수 증가
		idol.setFanCount(idol.getFanCount() + 1);

		// db 저장
		userRepository.save(user);
		idolRepository.save(idol);
	}

	/**
	 * 관심 아이돌 삭제
	 */
	public void deleteInterestIdol(String idolName) {
	}
}
