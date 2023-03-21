import { Link, useParams } from "react-router-dom";

import Bg from "../components/idolpage/sampleImg/Rectangle 299.png"
import IdolBanner from "../components/idolpage/IdolBanner";
import IdolChat from "../components/idolpage/IdolChat";
import IdolData from "../components/idolpage/IdolData";
import IdolEmotion from "../components/idolpage/IdolEmotion";
import IdolNews from "../components/idolpage/IdolNews";
import IdolYoutube from "../components/idolpage/IdolYoutube";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;



const BannerImg = styled.img`
  width: 100%;
  height: 100%;
  background-image: url(${Bg});
  background-size: cover;
  opacity: 0.8;

`;

function IdolPage() {
  const params = useParams();
  const idolName = params.idolName;
  
  return (
    <Wrapper>
      <BannerImg src={Bg}/>
      <IdolData />
      <IdolEmotion />
      <IdolNews />
      <IdolYoutube />
      <IdolChat />
      <h2>이 페이지의 아이돌 이름은 "{`${idolName}`}"입니다. </h2>
      <h2>
        <Link to={`/news/${idolName}`}>이 아이돌의 뉴스 디테일 페이지로 이동</Link>
      </h2>
    </Wrapper>
  );
}

export default IdolPage;
