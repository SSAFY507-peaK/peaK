import { TrendNewsListType, TrendYoutubeListType } from "../_utils/Types.js";

import CarouselCustom from "../components/Carousel/CarouselCustom.jsx";
import TitleContent from "../components/TitleContent";
import Top8 from "../components/MainPage/Top8";
import TrendKeyword from "../components/MainPage/TrendKeyword";
import axios from "axios";
import styled from "styled-components";
import { useLoaderData } from "react-router";

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

const CarouselDiv = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const MainGrid = styled.div`
  display: grid;
  width: 100%;
  height: auto;

  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 70vh auto;
  gap: 25px;
`;

function MainPage() {
  const [TrendNewsList, TrendYoutubeList] = useLoaderData() as [
    TrendNewsListType[],
    TrendYoutubeListType[],
  ];

  const CarouselNewsData = (
    <CarouselDiv>
      <CarouselCustom data={TrendNewsList} />
    </CarouselDiv>
  );
  const CarouselYoutubeData = (
    <CarouselDiv>
      <CarouselCustom data={TrendYoutubeList} />
    </CarouselDiv>
  );
  return (
    <MainGrid>
      <TitleContent
        data={Top8()}
        gridColumn="1 / 4"
        title={
          <h3>
            랭킹 <span style={{ color: "var(--purple500-color)" }}>Top8</span>
          </h3>
        }
      />
      <TitleContent
        data={<TrendKeyword />}
        gridColumn="4 / 5"
        title={
          <h3>
            인기 <span style={{ color: "var(--purple500-color)" }}>키워드</span>
          </h3>
        }
      />
      <TitleContent
        data={CarouselNewsData}
        gridColumn="1 / 3"
        noContentBackground={true}
        title={
          <h3>
            트렌딩 <span style={{ color: "var(--purple500-color)" }}>뉴스</span>
          </h3>
        }
      />
      <TitleContent
        data={CarouselYoutubeData}
        gridColumn="3 / 5"
        noContentBackground={true}
        title={
          <h3>
            트렌딩 <span style={{ color: "var(--purple500-color)" }}>유튜브</span>
          </h3>
        }
      />
    </MainGrid>
  );
}

export default MainPage;
