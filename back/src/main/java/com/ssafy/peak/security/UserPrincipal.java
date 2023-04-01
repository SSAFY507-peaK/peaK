package com.ssafy.peak.security;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import com.ssafy.peak.domain.User;
import com.ssafy.peak.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Component
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserPrincipal implements UserDetails, OAuth2User {

	private String id;
	private String email;
	private Role role;
	private Collection<SimpleGrantedAuthority> authorities;
	private Map<String, Object> attributes;

	/**
	 * User -> UserPrincipal
	 */
	public static UserPrincipal createUserPrincipal(User user) {
		UserPrincipal userPrincipal = UserPrincipal.builder()
			.id(user.getId())
			.email(user.getEmail())
			.role(user.getRole())
			.build();
		userPrincipal.setAuthorities(Arrays.asList(new SimpleGrantedAuthority(user.getRole().toString())));
		return userPrincipal;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(() -> String.valueOf(role));

		return authorities;
	}

	/**
	 * @return 회원 정보 from Resource Server (Kakao)
	 */
	@Override
	public Map<String, Object> getAttributes() {
		return attributes;
	}

	/**
	 * @return email
	 */
	@Override
	public String getUsername() {
		return email;
	}

	/**
	 * @return id
	 */
	@Override
	public String getName() {
		return String.valueOf(id);
	}

	@Override
	public String getPassword() {
		return null;
	}

	@Override
	public boolean isAccountNonExpired() {
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return false;
	}

	@Override
	public boolean isEnabled() {
		return false;
	}
}
