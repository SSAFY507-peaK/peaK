package com.ssafy.peak.util;

import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RedisUtil {

	private final StringRedisTemplate stringRedisTemplate;

	/**
	 *  key를 통해 데이터 가져오기
	 */
	public String getData(String key) {
		ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
		return valueOperations.get(key);
	}

	/**
	 * (key, value) 저장
	 */
	public void setData(String key, String value) {
		ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
		valueOperations.set(key, value);
	}

	/**
	 * 유효 시간동안 (key, value) 저장
	 */
	public void setDataExpire(String key, String value, long milliseconds) {
		ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
		valueOperations.set(key, value, milliseconds, TimeUnit.MILLISECONDS);
	}

	/**
	 * key를 통해 데이터 삭제
	 */
	public void deleteData(String key) {
		stringRedisTemplate.delete(key);
	}

}
