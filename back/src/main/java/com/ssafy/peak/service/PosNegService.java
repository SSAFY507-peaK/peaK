package com.ssafy.peak.service;

import com.ssafy.peak.domain.PosNeg;
import com.ssafy.peak.dto.idol.IdolPosNegResponseDto;
import com.ssafy.peak.dto.idol.PosNegDto;
import com.ssafy.peak.repository.PosNegRepository;
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
public class PosNegService {
    private final PosNegRepository posNegRepository;
// 3 2 1 31 30 29 28 27
    public IdolPosNegResponseDto posNegWeeklyByIdol(String idol){
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startDateTime= dateTimeToDate(now).minusDays(7);
        LocalDateTime endDateTime= dateTimeToDate(now).minusDays(1);
        List<PosNeg> posNegList = posNegRepository.findByIdolDateBetween(startDateTime, endDateTime, idol);
        List<PosNegDto> posNegWeek = new ArrayList<>();
        for(PosNeg posNeg : posNegList){
            posNegWeek.add(PosNegDto.of(posNeg));
        }


//        PosNeg currentPosNeg = posNegRepository.findByDateAndIdol(endDateTime, idol);

        IdolPosNegResponseDto dto = IdolPosNegResponseDto.builder()
                .posNegWeek(posNegWeek)
                .build();
        return dto;
    }
}
