package com.ssafy.peak.service;

import com.ssafy.peak.domain.rank.RankByDate;
import com.ssafy.peak.domain.rank.RankByHour;
import com.ssafy.peak.dto.idol.IdolRankByDayResponseDto;
import com.ssafy.peak.dto.rank.RankResponseDto;
import com.ssafy.peak.repository.RankByDateRepository;
import com.ssafy.peak.repository.RankByHourRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.ssafy.peak.util.Utils.dateTimeToDate;
import static com.ssafy.peak.util.Utils.dateTimeToHour;

@Service
@RequiredArgsConstructor
@Slf4j
public class RankByDateService {
    private final RankByDateRepository rankByDateRepository;
    private final RankByHourService rankByHourService;

    public IdolRankByDayResponseDto rankByIdolWeekly(String idol){
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startDate = dateTimeToDate(now).minusDays(7);
        LocalDateTime endDate = dateTimeToDate(now);

        List<RankResponseDto> rankList = rankByDateRepository.findByDateTimeBetween(startDate, endDate, idol);

        RankResponseDto rankByHourByIdol = rankByHourService.rankByIdol(idol);

        IdolRankByDayResponseDto dto = IdolRankByDayResponseDto.builder().rankWeek(rankList).current(rankByHourByIdol).build();
        return dto;
    }
}
