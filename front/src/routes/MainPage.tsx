import CommonDiv from "../components/mainpage/CommonDiv";
import MainDiv from "../components/MainDiv";
import NameDiv from "../components/NameDiv";
import NewCarousel from "../components/newcarousel/NewCarousel.jsx";
import Top8 from "../components/mainpage/Top8";
import TrendKeyword from "../components/mainpage/TrendKeyword";
import TrendNews from "../components/mainpage/TrendNews";
import styled from "styled-components";

interface NewCarouselDivType {
  ratio: number;
}

const CarouselDiv = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const NewCarouselDiv = styled.div<NewCarouselDivType>`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  flex: ${props => props.ratio};
`;

function MainPage() {
  return (
    <>
      <MainDiv style={{ marginBottom: "2vh" }}>
        <CommonDiv
          type={true}
          firstWord="랭킹"
          secondWord="Top 8"
          ratio="0.7"
          mr={true}
          data={Top8()}
        />
        <CommonDiv
          type={false}
          firstWord="인기"
          secondWord="키워드"
          ratio="0.3"
          data={<TrendKeyword />}
        />
      </MainDiv>
      <MainDiv>
        <NewCarouselDiv ratio={0.47}>
          <NameDiv type={false} firstWord="트렌딩" secondWord="뉴스" />
          <CarouselDiv>
            <NewCarousel />
          </CarouselDiv>
        </NewCarouselDiv>
        <NewCarouselDiv ratio={0.47}>
          <NameDiv type={false} firstWord="트렌딩" secondWord="유튜브" />
          <CarouselDiv>
            <NewCarousel />
          </CarouselDiv>
        </NewCarouselDiv>
      </MainDiv>
    </>
  );
}

export default MainPage;
