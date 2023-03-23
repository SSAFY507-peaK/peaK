import React from "react";
import { SectionWrapper, TextSection, ImageSection } from "./SectionComponents";
import chartImg from "../../assets/chart.png";
import internetImg from "../../assets/internet.png";
import contentsImg from "../../assets/contents.png";
import swimImg from "../../assets/swim.png"

type WrapperType = {
  backgroundColor?: string;
};

function SectionOne({ backgroundColor }: WrapperType): JSX.Element {
  return (
    <SectionWrapper backgroundColor={backgroundColor}>
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
    </SectionWrapper>
  );
}

function SectionTwo({ backgroundColor }: WrapperType): JSX.Element {
  return (
    <SectionWrapper backgroundColor={backgroundColor}>
      <ImageSection width="100%">
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
    </SectionWrapper>
  );
}

function SectionThree({ backgroundColor }: WrapperType): JSX.Element {
  return (
    <SectionWrapper backgroundColor={backgroundColor}>
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
    </SectionWrapper>
  );
}

function SectionFour({ backgroundColor }: WrapperType): JSX.Element {
  return (
    <SectionWrapper backgroundColor={backgroundColor}>
      <TextSection>
        <h2>지금 바로 데이터의 바다로 풍덩</h2>
        <p>소셜 로그인으로 간단하게 즐겨보세요</p>
        <div>
          <button>카카오</button>
          <button>네이버</button>
        </div>
      </TextSection>
      <ImageSection width="100%">
        <img src={swimImg} alt="수영 이미지" />
      </ImageSection>
    </SectionWrapper>
  );
}

export { SectionOne, SectionTwo, SectionThree, SectionFour };