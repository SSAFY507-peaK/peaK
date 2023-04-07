import { TrendNewsListType, TrendYoutubeListType } from "../_utils/Types";

// import CommonDiv from "../components/MainPage/CommonDiv";
// import MainDiv from "../components/MainDiv";
import TrendingNewsGrid from "../components/TrendingPage/TrendingNewsGrid";
import TrendingYoutube from "../components/TrendingPage/TrendingYoutube";
import axios from "axios";
import { useLoaderData } from "react-router";
import styled from "styled-components";
import TitleContent from "../components/TitleContent";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function loader() {
  let TrendNewsList,
    TrendYoutubeList = null;

  await axios
    .get(`${BASE_URL}/api/news/list/all-idol`)
    .then(response => {
      TrendNewsList = response.data;
    })
    .catch(error => console.log(error));

  await axios
    .get(`${BASE_URL}/api/youtube/아이돌`)
    .then(response => {
      TrendYoutubeList = response.data;
    })
    .catch(error => console.log(error));

  // return [TrendNewsList];
  return [TrendNewsList, TrendYoutubeList];
}

const TrendingGrid = styled.div`
  display: grid;
  width: 100%;
  height: auto;

  grid-template-columns: repeat(8, 1fr);
  //grid-template-rows: auto;
  gap: 25px;
`


function TrendingPage() {
  const [TrendNewsList, TrendYoutubeList] = useLoaderData() as [
    TrendNewsListType[],
    TrendYoutubeListType[],
  ];
  return (
    <TrendingGrid>
      <TitleContent
        title={
          <h3>
            트렌딩 <span style={{ color: "var(--purple500-color)" }}>뉴스</span>
          </h3>
        }
        gridColumn="1 / 6"
        height="calc(100vh - 60px)"
        data={<TrendingNewsGrid data={TrendNewsList} />}
      />
      <TitleContent
        title={
          <h3>
            트렌딩 <span style={{ color: "var(--purple500-color)" }}>유튜브</span>
          </h3>
        }
        gridColumn="6 / 9"
        height="calc(100vh - 60px)"
        data={<TrendingYoutube data={TrendYoutubeList} />}
      />
    </TrendingGrid>
  );
}

export default TrendingPage;
