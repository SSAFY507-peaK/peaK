import React from "react";
import { Wrapper, TextSection, ImageSection } from "./SectionComponents";
import internetImg from "../../assets/data.png";

type WrapperType = {
  backgroundColor: string;
};

function SectionTwo({ backgroundColor }: WrapperType) {
  return (
    <Wrapper backgroundColor={backgroundColor}>
      <ImageSection>
        <img src={internetImg} alt="데이터 수집 이미지" />
      </ImageSection>
      <TextSection>
        <h2>데이터는 어디서 가져오나요?</h2>
        <p>
          데이터는 트위터, 뉴스, 커뮤니티 언급량을 이용합니다.
          <br />그 데이터를 잘 이용해서 어쩌구 저쩌구 열심히 산정합니다.
        </p>
        <p>
          잘 분석해서 점수를 낸다. 데이터는 몇 시간마다 갱신되고 <br />
          긍정지수는 어쩌구저쩌구 쌀라쌀라.
        </p>
      </TextSection>
    </Wrapper>
  );
}

export default SectionTwo;
