import React from "react";
import { Wrapper, TextSection, ImageSection } from "./SectionComponents";
import contentsImg from "../../assets/contents.png";

type WrapperType = {
  backgroundColor: string;
};

function SectionThree({ backgroundColor }: WrapperType) {
  return (
    <Wrapper backgroundColor={backgroundColor}>
      <TextSection>
        <h2>분석 이외에도 다양한 즐거움</h2>
        <p>그밖에 데이터 분석 이외에도 어떤 서비스를 제공하는지 써주자.</p>
        <p>
          실시간 트렌드 뉴스 분석, 실시간 트렌드 유튜브 제공
          <br />
          이뿐만 아니라 한 줄 응원까지~ 어쩌구~
        </p>
      </TextSection>
      <ImageSection>
        <img src={contentsImg} alt="다양한 컨텐츠 이미지" />
      </ImageSection>
    </Wrapper>
  );
}

export default SectionThree;
