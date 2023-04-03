package com.ssafy.peak.util;

import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.ssafy.peak.security.UserPrincipal;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class SecurityUtil {

	public Optional<String> getCurrentUserId() {

		// SecurityContextHolder 에서 인증 정보 가져오기
		final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null) {
			log.info("Security Context에 인증 정보가 없습니다.");
			return Optional.empty();
		}
		String userId = null;
		if (authentication.getPrincipal() instanceof UserPrincipal) {
			// 정보가 UserPrincipal 형태이면 getName() 으로 회원 id 값 가져오기
			UserPrincipal springSecurityUser = (UserPrincipal)authentication.getPrincipal();
			userId = springSecurityUser.getName();
		} else if (authentication.getPrincipal() instanceof String) {
			// 정보가 String 형태이면 그대로 가져오기 (저장 시 id 값을 넣게 되어있음)
			userId = (String)authentication.getPrincipal();
		}

		log.info("userId: {}", userId);

		return Optional.ofNullable(userId);
	}
}
