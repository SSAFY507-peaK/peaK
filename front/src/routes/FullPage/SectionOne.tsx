import React from "react";
import { Wrapper, TextSection, ImageSection } from "./SectionComponents";
import chartImg from "../../assets/chart.png";

type WrapperType = {
  backgroundColor: string;
};

function SectionOne({ backgroundColor }: WrapperType) {
  return (
    <Wrapper backgroundColor={backgroundColor}>
      <TextSection>
        <h2>나의 아이돌을 분석한다면?</h2>
        <p>
          나의 아이돌 어쩌구 저쩌구 분석하고싶은가 자네
          <br />
          여기 아이돌을 분석해드리겠다네
        </p>
        <p>
          우리는 어떤 서비스인지 솰라솰라 소개해주는 인트로 페이지
          <br />
          근데 너무 길면 지루하니까 짧게 고~
        </p>
      </TextSection>
      <ImageSection>
        <img src={chartImg} alt="차트 이미지" />
      </ImageSection>
    </Wrapper>
  );
}

export default SectionOne;
