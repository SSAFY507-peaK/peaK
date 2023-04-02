package com.ssafy.peak.controller;

import com.ssafy.peak.dto.idol.IdolListResponseDto;
import com.ssafy.peak.dto.idol.IdolRankByDayResponseDto;
import com.ssafy.peak.dto.rank.RankResponseDto;
import com.ssafy.peak.dto.rank.TotalRankListResponseDto;
import com.ssafy.peak.service.RankByDateService;
import com.ssafy.peak.service.RankByHourService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/peak")
@RequiredArgsConstructor
@Slf4j
public class PeakController {
    private final RankByHourService rankByHourService;
    private final RankByDateService rankByDateService;

    @GetMapping("/top")
    public IdolListResponseDto top(){
        return rankByHourService.top();
    }

    @GetMapping("/")
    public TotalRankListResponseDto list(LocalDateTime dateTime){
        return rankByHourService.list(dateTime);
    }

    @GetMapping("/weekly/{idol}")
    public IdolRankByDayResponseDto rankByIdolWeekly(@PathVariable("idol") String idol){
        return rankByDateService.rankByIdolWeekly(idol);


    }

    @GetMapping("/current/{idol}")
    public RankResponseDto rankByIdol(@PathVariable("idol") String idol){
        return rankByHourService.rankByIdol(LocalDateTime.now(), idol);
    }
}
