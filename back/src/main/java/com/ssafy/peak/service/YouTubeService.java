package com.ssafy.peak.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.SearchListResponse;
import com.google.api.services.youtube.model.SearchResult;
import com.ssafy.peak.dto.YouTubeDto;
import com.ssafy.peak.exception.CustomException;
import com.ssafy.peak.exception.CustomExceptionType;
import com.ssafy.peak.repository.IdolRepository;
import com.ssafy.peak.util.RedisUtil;
import com.ssafy.peak.util.Utils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class YouTubeService {
	private final IdolRepository idolRepository;
	private final RedisUtil redisUtil;

	// GET https://www.googleapis.com/youtube/v3/search
	private static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();
	private static final JsonFactory JSON_FACTORY = new JacksonFactory();
	private static final long NUMBER_OF_VIDEOS_RETURNED = 30;
	private static final String GOOGLE_YOUTUBE_URL = "https://www.youtube.com/watch?v=";
	@Value("${youtube.search.type}")
	private String YOUTUBE_SEARCH_TYPE;
	@Value("${youtube.search.fields}")
	private String YOUTUBE_SEARCH_FIELDS;
	@Value("${youtube.api.application}")
	private String YOUTUBE_API_APPLICATION;
	@Value("${youtube.api.key}")
	private String YOUTUBE_APIKEY;
	private static YouTube youtube;

	public List<YouTubeDto> searchYouTube(String keyword) {

		// 검색어가 없으면 예외 처리
		if (!StringUtils.hasText(keyword)) {
			throw new CustomException(CustomExceptionType.RUNTIME_EXCEPTION);
		}
		// 아이돌 전체 검색이 아닐 경우 아이돌 유무 확인
		if (!keyword.equals(Utils.IDOL)) {
			idolRepository.findByIdol(keyword)
				.orElseThrow(() -> new CustomException(CustomExceptionType.IDOL_NOT_FOUND));
		}

		log.info("searchYouTube | keyword: {}", keyword);

		youtube = new YouTube.Builder(HTTP_TRANSPORT, JSON_FACTORY, new HttpRequestInitializer() {
			public void initialize(HttpRequest request) throws IOException {
			}
		}).setApplicationName(YOUTUBE_API_APPLICATION).build();

		List<YouTubeDto> youTubeDtoList = new ArrayList<>();

		log.info("searchYouTube | youTubeDtoList: {}", youTubeDtoList);

		if (redisUtil.getYouTubeSearchList(keyword) == null) {
			// 검색 기록이 없으면 youtube api 요청해서 redis에 저장 후 return
			try {
				YouTube.Search.List search = youtube.search().list(Collections.singletonList(Utils.PART));
				search.setKey(YOUTUBE_APIKEY);    // youtube api key 설정
				search.setQ(keyword);    // 검색어 설정
				search.setType(Collections.singletonList(YOUTUBE_SEARCH_TYPE));    // 검색 타입 설정
				search.setFields(YOUTUBE_SEARCH_FIELDS);    //	원하는 정보 필드명 설정
				search.setMaxResults(NUMBER_OF_VIDEOS_RETURNED);    // 반환 개수 설정
				SearchListResponse searchResponse = search.execute();

				List<SearchResult> searchResultList = searchResponse.getItems();

				log.info("searchResultList: {}", searchResultList);

				if (!CollectionUtils.isEmpty(searchResultList)) {
					for (SearchResult searchResult : searchResultList) {
						YouTubeDto youTubeDto = YouTubeDto.builder()
							.title(searchResult.getSnippet().getTitle())
							.url(GOOGLE_YOUTUBE_URL + searchResult.getId().getVideoId())
							.thumbnail(searchResult.getSnippet().getThumbnails().getHigh().getUrl())
							.build();
						youTubeDtoList.add(youTubeDto);
					}
					redisUtil.setYouTubeSearchListExpire(keyword, youTubeDtoList, Utils.ONE_DAY);
				} else {
					log.info("YouTube API로부터 [ {} ]검색 결과가 없습니다", keyword);
				}
			} catch (GoogleJsonResponseException e) {
				System.err.println("There was a service error: " + e.getDetails().getCode() + " : "
					+ e.getDetails().getMessage());
			} catch (IOException e) {
				System.err.println("There was an IO error: " + e.getCause() + " : " + e.getMessage());
			} catch (Throwable t) {
				t.printStackTrace();
			}
		} else {
			youTubeDtoList = (List<YouTubeDto>)redisUtil.getYouTubeSearchList(keyword);
		}
		return youTubeDtoList;
	}
}
