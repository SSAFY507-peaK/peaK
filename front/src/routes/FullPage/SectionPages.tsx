import React from "react";
import {PageContainer, TextSection, ContentSection} from "./SectionComponents";
import { KakaoLogin } from "../../components/LoginModal/LoginButton";
import chartImg from "../../assets/chart.png";
import internetImg from "../../assets/internet.png";
import contentsImg from "../../assets/contents.png";
import swimImg from "../../assets/swim.png"

type WrapperType = {
  backgroundColor?: string;
};

const ImgStyleRight:React.CSSProperties = {
  position: "absolute",
  // opacity: 0.6,
  bottom: 25,
  right: 0,
  height: "75%",
}
const ImgStyleLeft:React.CSSProperties = {
  position: "absolute",
  // opacity: 0.6,
  bottom: 25,
  left: 0,
  height: "75%",
}

function SectionOne({ backgroundColor }: WrapperType): JSX.Element {
  return (
    <PageContainer backgroundColor={backgroundColor} >
      <ContentSection>
        <img style={ImgStyleRight} src={chartImg} alt="차트 이미지" />
        <TextSection className="left">
          <h1>나의 아이돌을 <span style={{color: "var(--red500-color)"}} >분석</span>한다면?</h1>
          <div>
            <p>나의 아이돌은 얼마나 언급되고 있을까요?</p>
            <p>긍정적인 글이 많을까요 부정적인 글이 많을까요?</p>
          </div>
          <div>
            <p>peaK에서는 게시글을 기반으로 아이돌을 분석해줍니다.</p>
          </div>
        </TextSection>
      </ContentSection>
    </PageContainer>
  );
}

function SectionTwo({ backgroundColor }: WrapperType): JSX.Element {
  return (
    <PageContainer backgroundColor={backgroundColor} >
      <ContentSection>
        <img style={ImgStyleLeft} src={internetImg} alt="데이터 수집 이미지" />
        <TextSection className="right">
          <h1>데이터는 <span style={{color: "var(--purple500-color)"}} >어디서</span> 가져오나요?</h1>
          <div>
            <p>데이터는 트위터 ,뉴스에서 수집합니다</p>
          </div>
          <div>
            <p>트위터 감성분석을 통해 내 최애가 어떤 반응을 이끌어내는지 살펴보고</p>
            <p>뉴스를 통해 아이돌의 가장 핫한 키워드를 알아보세요!</p>
          </div>
          <div>
            <p>랭킹과 뉴스는 1시간, 그 외의 지수들은 일 단위로 갱신됩니다</p>
          </div>
        </TextSection>
      </ContentSection>
    </PageContainer>
  );
}

function SectionThree({ backgroundColor }: WrapperType): JSX.Element {
  return (
    <PageContainer backgroundColor={backgroundColor} >

      <ContentSection>
        <img style={ImgStyleRight} src={contentsImg} alt="다양한 컨텐츠 이미지" />
        <TextSection className="left">
          <h1>분석 이외에도 다양한 <span style={{color: "var(--red500-color)"}} >즐거움</span></h1>
          <div>
            <p>아이돌 뿐만 아니라 나의 데이터 분석도 제공하고 있습니다</p>
          </div>
          <div>
            <p>실시간 트렌드 뉴스, 실시간 트렌드 유튜브 제공,</p>
            <p>나의 아이돌에게 남기는 한 줄 응원</p>
          </div>
          <div>
            <p>나의 활동 내역을 마이페이지에서 확인해보세요</p>
          </div>
        </TextSection>
      </ContentSection>
    </PageContainer>
  );
}

function SectionFour({ backgroundColor }: WrapperType): JSX.Element {
  return (
    <PageContainer backgroundColor={backgroundColor} >
      <ContentSection>
        <img style={ImgStyleLeft} src={swimImg} alt="수영 이미지" />
        <TextSection className="right">
          <h1>지금 바로 데이터 속으로 <span style={{color: "var(--graph3-color)"}} >풍덩</span></h1>
          <div style={{marginBottom: "70px"}}>
            <p>아이돌을 위한, 나를 위한 분석 사이트 peaK</p>
            <p>소셜 로그인으로 간단하게 즐겨보세요!</p>
          </div>
          <KakaoLogin />
        </TextSection>
      </ContentSection>
    </PageContainer>
  );
}

export { SectionOne, SectionTwo, SectionThree, SectionFour };