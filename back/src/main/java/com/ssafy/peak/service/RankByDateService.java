package com.ssafy.peak.service;

import com.ssafy.peak.domain.rank.RankByDate;
import com.ssafy.peak.dto.idol.IdolRankByDayResponseDto;
import com.ssafy.peak.dto.rank.RankResponseDto;
import com.ssafy.peak.repository.RankByDateRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.ssafy.peak.util.Utils.dateTimeToDate;

@Service
@RequiredArgsConstructor
@Slf4j
public class RankByDateService {
    private final RankByDateRepository rankByDateRepository;

    public IdolRankByDayResponseDto rankByIdolWeekly(String idol){
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startDate = dateTimeToDate(now.minusDays(7));
        LocalDateTime endDate = dateTimeToDate(now);

        List<RankResponseDto> rankByIdolList = new ArrayList<>();
        List<RankByDate> rankList = rankByDateRepository.findByDateTimeBetween(startDate, endDate, idol);
        for(RankByDate rank: rankList){
            RankByDate.RankInfo info = rank.getIdols().get(0);
            RankResponseDto rankDto = RankResponseDto.builder().rank(info.getRank()).score(info.getScore()).build();
            rankByIdolList.add(rankDto);
        }
        IdolRankByDayResponseDto dto = IdolRankByDayResponseDto.builder().rankWeek(rankByIdolList).build();
        return dto;
    }
}
