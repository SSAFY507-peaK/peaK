import CommonDiv from "../components/MainPage/CommonDiv";
import MainDiv from "../components/MainDiv";
import { TrendNewsListType } from "../_utils/Types";
import TrendingNewsGrid from "../components/TrendingPage/TrendingNewsGrid";
import TrendingYoutube from "../components/TrendingPage/TrendingYoutube";
import axios from "axios";
import { useLoaderData } from "react-router";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function loader() {
  let TrendNewsList = null;

  await axios
    .get(`${BASE_URL}/api/news/list/all-idol`)
    .then(response => {
      TrendNewsList = response.data;
    })
    .catch(error => console.log(error));

  return TrendNewsList;
}

function TrendingPage() {
  const TrendNewsList = useLoaderData() as TrendNewsListType[];
  return (
    <MainDiv>
      <CommonDiv
        type={false}
        firstWord="트렌딩"
        secondWord="뉴스"
        ratio="0.7"
        mr={true}
        h={true}
        data={<TrendingNewsGrid data={TrendNewsList} />}
      />
      <CommonDiv
        type={false}
        firstWord="트렌딩"
        secondWord="유튜브"
        ratio="0.3"
        h={true}
        data={<TrendingYoutube />}
      />
    </MainDiv>
  );
}

export default TrendingPage;
