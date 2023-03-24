import RankingTop8 from "../components/mainpage/RankingTop8";
import TrendKeyword from "../components/mainpage/TrendKeyword";
import TrendNews from "../components/mainpage/TrendNews";
import TrendYoutube from "../components/mainpage/TrendYoutube";
import styled from "styled-components";

const MainDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

/** 메인페이지 */
function MainPage() {
  return (
    <>
      <MainDiv>
        <RankingTop8 />
        <TrendKeyword />
      </MainDiv>
      <MainDiv>
        <TrendNews />
        <TrendYoutube />
      </MainDiv>
    </>
    // <FullPage />
  );
}

export default MainPage;
