import CommonDiv from "../components/mainpage/CommonDiv";
import MainDiv from "../components/MainDiv";
import TrendingNews from "../components/trendingpage/TrendingNews";
import TrendingYoutube from "../components/trendingpage/TrendingYoutube";

function TrendingPage() {
  return (
    <MainDiv>
      <CommonDiv
        type={false}
        firstWord="트렌딩"
        secondWord="유튜브"
        ratio="0.3"
        mr={true}
        data={<TrendingYoutube />}
      />
      <CommonDiv
        type={false}
        firstWord="트렌딩"
        secondWord="뉴스"
        ratio="0.7"
        data={<TrendingNews />}
      />
    </MainDiv>
  );
}

export default TrendingPage;
