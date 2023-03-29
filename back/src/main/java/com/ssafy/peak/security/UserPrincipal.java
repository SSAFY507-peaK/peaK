package com.ssafy.peak.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import com.ssafy.peak.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Component
@Getter
@Setter
@Builder
@AllArgsConstructor
public class UserPrincipal implements UserDetails, OAuth2User {

	private long id;
	private String email;
	private String nickname;
	private Role role;
	private Map<String, Object> attributes;

	/**
	 * User -> UserPrincipal
	 */
	// public UserPrincipal createUserPrincipal(User user) {
	//     UserPrincipal userPrincipal = UserPrincipal.builder()
	//         .id(user.getId())
	//         .email(user.getEmail())
	//         .nickname(user.getNickname())
	//         .attributes(user.getAttributes())
	//         .build();
	//
	//     return userPrincipal;
	// }

	/**
	 * @return
	 */
	@Override
	public Map<String, Object> getAttributes() {
		return attributes;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(() -> String.valueOf(role));

		return authorities;
	}

	@Override
	public String getPassword() {
		return null;
	}

	/**
	 * @return email
	 */
	@Override
	public String getUsername() {
		return email;
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

	/**
	 * @return id
	 */
	@Override
	public String getName() {
		return id + "";
	}
}
