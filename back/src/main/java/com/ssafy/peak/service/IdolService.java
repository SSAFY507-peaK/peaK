package com.ssafy.peak.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.peak.domain.Comment;
import com.ssafy.peak.domain.Idol.Idol;
import com.ssafy.peak.domain.User;
import com.ssafy.peak.dto.CommentDto;
import com.ssafy.peak.dto.idol.response.IdolCommentResponseDto;
import com.ssafy.peak.dto.idol.response.IdolDetailResponseDto;
import com.ssafy.peak.dto.idol.response.IdolListResponseDto;
import com.ssafy.peak.exception.CustomException;
import com.ssafy.peak.exception.CustomExceptionType;
import com.ssafy.peak.repository.CommentRepository;
import com.ssafy.peak.repository.IdolRepository;
import com.ssafy.peak.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class IdolService {
	private final IdolRepository idolRepository;
	private final CommentRepository commentRepository;
	private final UserRepository userRepository;
	private final InterestService interestService;

	public IdolListResponseDto getIdolList() {
		List<Idol> idolList = idolRepository.findAll();
		List<String> idolNameList = new ArrayList<>();
		for (Idol idol : idolList) {
			idolNameList.add(idol.getIdol());
		}
		IdolListResponseDto dto = IdolListResponseDto.builder().idols(idolNameList).build();
		return dto;
	}

	public IdolDetailResponseDto getDetailByIdol(String idolName) {
		List<Idol> idolList = idolRepository.findAll();
		Idol target = new Idol();
		boolean isInterest = interestService.isInterestIdol(idolName);
		for (Idol idol : idolList) {
			if (idol.getIdol().equals(idolName)) {
				target = idol;
			}
		}
		IdolDetailResponseDto dto = IdolDetailResponseDto.builder()
			.idol(target.getIdol())
			.snsLink(target.getSnsLink())
			.interest(isInterest)
			.build();
		return dto;
	}

	public IdolCommentResponseDto getCommentByIdol(String idolName) {
		List<Comment> commentList = commentRepository.findByIdol(idolName)
			.orElseGet(ArrayList::new);
		List<CommentDto> commentDtoList = new ArrayList<>();

		for (Comment comment : commentList) {
			User user = userRepository.findByEmail(comment.getEmail())
				.orElseThrow(() -> new CustomException(CustomExceptionType.USER_NOT_FOUND));
			String nickname = user.getNickname();
			commentDtoList.add(CommentDto.of(comment, nickname));
			if (commentDtoList.size() >= 30)
				break;
		}

		IdolCommentResponseDto dto = IdolCommentResponseDto.builder().comments(commentDtoList).build();
		return dto;
	}

}
