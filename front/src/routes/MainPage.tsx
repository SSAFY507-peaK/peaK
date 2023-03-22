import Carousel from "../components/Carousel";
import styled from "styled-components";
import Wrapper from "../components/Wrapper"
import FullPage from "./FullPage/FullPage.js"


/** 메인페이지 탭 메뉴 */
const TapMenu = styled.div`
  font-size: 24px;
  margin-top: 50px;
  margin-bottom: 25px;
`;

/** 1~3위, 4~8위 */
const RankMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

/** 메인페이지 */
function MainPage() {
  return (
    // <Wrapper>
    //   <div>
    //     <TapMenu>실시간 아이돌 Top 8</TapMenu>
    //     <RankMenu></RankMenu>
    //     <RankMenu></RankMenu>
    //     <TapMenu>나의 관심 아이돌</TapMenu>
    //
    //     <TapMenu>트렌딩 유튜브</TapMenu>
    //     <Carousel></Carousel>
    //
    //     <TapMenu>트렌딩 뉴스</TapMenu>
    //     <Carousel></Carousel>
    //     <div></div>
    //   </div>
    // </Wrapper>
    <FullPage />
  );
}

export default MainPage;
