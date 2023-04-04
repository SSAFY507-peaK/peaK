import CommonDiv from "../components/MainPage/CommonDiv";
import MainDiv from "../components/MainDiv";
import TrendingNews from "../components/TrendingPage/TrendingNews";
import TrendingYoutube from "../components/TrendingPage/TrendingYoutube";

function TrendingPage() {
  return (
    <MainDiv>
      <CommonDiv
        type={false}
        firstWord="트렌딩"
        secondWord="뉴스"
        ratio="0.65"
        mr={true}
        h={true}
        data={<TrendingNews />}
      />
      <CommonDiv
        type={false}
        firstWord="트렌딩"
        secondWord="유튜브"
        ratio="0.35"
        h={true}
        data={<TrendingYoutube />}
      />
    </MainDiv>
  );
}

export default TrendingPage;
