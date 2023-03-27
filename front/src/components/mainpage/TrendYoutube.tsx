import CarouselCustom from "../carousel/CarouslCustom";
import styled from "styled-components";

const ComponentDiv = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  padding: 40px;
  flex: 0.5;
  padding: 10px 30px;
  margin-top: 7.5px;
  margin-left: 7.5px;
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const PurpleH2 = styled.h2`
  color: var(--purple400-color);
  margin-right: 5px;
  margin-left: 5px;
`;
const YoutubeCarouselDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const CarouselDiv = styled.div`
  width: 70%;
`;

function TrendYoutube(props: any) {
  const youtubeData = props.items[0];
  console.log("hello", youtubeData);
  let items: any[] = [];
  youtubeData.map((item: any) =>
    items.push({ title: `${item.snippet.title}`, src: `${item.snippet.thumbnails.high.url}` }),
  );
  console.log("items", items);
  return (
    <ComponentDiv>
      <TitleDiv>
        <h2>트렌딩</h2>
        <PurpleH2> 유튜브</PurpleH2>
      </TitleDiv>
      <div style={{ width: "100%" }}>
        <YoutubeCarouselDiv>
          <CarouselDiv>
            <CarouselCustom items={items} width="250px" height="180px"></CarouselCustom>
          </CarouselDiv>
        </YoutubeCarouselDiv>
      </div>
    </ComponentDiv>
  );
}

export default TrendYoutube;
