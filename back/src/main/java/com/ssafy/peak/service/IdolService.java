package com.ssafy.peak.service;

import com.ssafy.peak.domain.Idol.Idol;
import com.ssafy.peak.dto.idol.IdolDetailResponseDto;
import com.ssafy.peak.dto.idol.IdolListResponseDto;
import com.ssafy.peak.dto.idol.IdolPosNegResponseDto;
import com.ssafy.peak.repository.IdolRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class IdolService {
    private final IdolRepository idolRepository;
    public IdolListResponseDto listName(){
        List<Idol> idolList = idolRepository.findAll();
        List<String> idolNameList = new ArrayList<>();
        for(Idol idol : idolList){
            idolNameList.add(idol.getIdol());
        }
        IdolListResponseDto dto = IdolListResponseDto.builder().idols(idolNameList).build();
        return dto;
    }

    // Header에서 토큰 가져와야됨
    // 일단 interest true로 함
    public IdolDetailResponseDto detailByIdol(String idolName){
        List<Idol> idolList = idolRepository.findAll();
        Idol target = new Idol();
        for(Idol idol: idolList){
            if(idol.getIdol().equals(idolName)){
                target = idol;
            }
        }
        IdolDetailResponseDto dto = IdolDetailResponseDto.builder().idol(target.getIdol()).snsLink(target.getSnsLink()).interest(true).build();
        return dto;
    }


}
