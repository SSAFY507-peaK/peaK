import CommonDiv from "../components/mainpage/CommonDiv";
import MainDiv from "../components/MainDiv";
import TrendingNews from "../components/trendingpage/TrendingNews";

function TrendingPage() {
  return (
    <MainDiv>
      <CommonDiv
        type={false}
        firstWord="트렌딩"
        secondWord="유튜브"
        ratio="0.3"
        mr={true}
        data={<p>유튜브 호버하면 재생 되도록 구성 예정</p>}
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
