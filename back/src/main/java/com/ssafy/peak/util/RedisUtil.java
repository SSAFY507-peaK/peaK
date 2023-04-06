package com.ssafy.peak.util;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import com.ssafy.peak.dto.YouTubeDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RedisUtil {

	private final StringRedisTemplate stringRedisTemplate;
	private final RedisTemplate redisTemplate;

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

	/**
	 * 유튜브 검색 리스트 가져오기
	 */
	public Object getYouTubeSearchList(String key) {
		// RedisOperations<String, Object> operations = redisTemplate.opsForList().getOperations();
		ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
		return valueOperations.get(key);
	}

	/**
	 * 유튜브 검색 리스트 저장
	 */
	public void setYouTubeSearchListExpire(String keyword, List<YouTubeDto> youTubeDtoList, long seconds) {
		ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
		valueOperations.set(keyword, youTubeDtoList, seconds, TimeUnit.SECONDS);
	}
}
