import CarouselIdol from "../CarouselIdol/CarouselIdol.jsx";
import TitleComponent from "./TitleComponent";
import styled from "styled-components";

const Frame = styled.div`
  border-radius: 30px;
  width: 100%;
  padding: 20px;
`;

const YoutubeCarouselDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const CarouselDiv = styled.div`
  width: 80%;
`;

function IdolYoutube(props: any) {
  const items = props.data;
  return (
    <Frame>
      <TitleComponent blacktxt="트렌딩" purpletxt="유튜브" />
      <YoutubeCarouselDiv>
        <CarouselDiv>
          <CarouselIdol data={items}></CarouselIdol>
        </CarouselDiv>
      </YoutubeCarouselDiv>
    </Frame>
  );
}

export default IdolYoutube;
