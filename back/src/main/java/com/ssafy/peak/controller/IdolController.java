package com.ssafy.peak.controller;

import com.ssafy.peak.dto.idol.IdolDetailResponseDto;
import com.ssafy.peak.dto.idol.IdolListResponseDto;
import com.ssafy.peak.dto.idol.IdolPosNegResponseDto;
import com.ssafy.peak.service.IdolService;
import com.ssafy.peak.service.PosNegService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/idol")
@RequiredArgsConstructor
@Slf4j
@RestController
public class IdolController {
    private final IdolService idolService;
    private final PosNegService posNegService;

    @GetMapping("/list")
    public IdolListResponseDto list(){
        IdolListResponseDto dto = idolService.listName();
        return dto;
    }


    @GetMapping("/{idol-name}")
    public IdolDetailResponseDto detailByIdol(@PathVariable("idol-name") String idolName ){
        IdolDetailResponseDto dto = idolService.detailByIdol(idolName);
        return dto;
    }
    @GetMapping("/idol/{idol-name}/pos-neg")
    public IdolPosNegResponseDto posNegWeekly(@PathVariable("idol-name") String idolName ){
        IdolPosNegResponseDto dto = posNegService.posNegWeeklyByIdol(idolName);
        return dto;

    }
}
