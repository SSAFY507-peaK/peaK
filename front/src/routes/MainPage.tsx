import RankingTop8 from "../components/mainpage/RankingTop8";
import TrendKeyword from "../components/mainpage/TrendKeyword";
import TrendNews from "../components/mainpage/TrendNews";
import TrendYoutube from "../components/mainpage/TrendYoutube";
import axios from "axios";
import styled from "styled-components";
import { useLoaderData } from "react-router";

export async function loader() {
  let items;

  await axios
    .get(
      "https://www.googleapis.com/youtube/v3/search?part=snippet&q=아이돌&key=AIzaSyB9YfLaWHlI9hTmQgfRoaTRRC6FRnDlVUA",
    )
    .then(response => (items = response.data.items));

  return [items];
}

const MainDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

/** 메인페이지 */
function MainPage() {
  const items = useLoaderData();
  return (
    <>
      <MainDiv>
        <RankingTop8 />
        <TrendKeyword />
      </MainDiv>
      <MainDiv>
        <TrendNews />
        <TrendYoutube items={items} />
      </MainDiv>
    </>
    // <FullPage />
  );
}

export default MainPage;
