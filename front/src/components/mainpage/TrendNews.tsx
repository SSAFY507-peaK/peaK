import CarouselCustom from "../carousel/CarouslCustom";
import styled from "styled-components";

const ComponentDiv = styled.div`
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  padding: 40px;
  flex: 0.5;
  padding: 10px 30px;
  margin-top: 7.5px;
  margin-left: 5px;
  margin-right: 7.5px;
`;

const NewsCarouselDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const CarouselDiv = styled.div`
  width: 85%;
`;

function TrendNews() {
  const items = [
    {
      title: "기안 84, 84세가 아닌 것..",
      content: "가나다라마바사아자차카타파하가",
      broad: "CNN",
      src: "https://ssl.pstatic.net/mimgnews/image/108/2023/03/27/0003139452_002_20230327145003970.jpg?type=w540",
    },
    {
      title: "BTS.. 흑역사라고 주장",
      content: "가나다라마바사아자차카타파하가",
      broad: "CNN",
      src: "https://cdn.cnn.com/cnnnext/dam/assets/220905135750-everyrealm-daniel-arsham-1-large-tease.jpg",
    },
    {
      title: "기사 제목 333",
      broad: "CNN",
      src: "https://cdn.cnn.com/cnnnext/dam/assets/220721082106-08-ehlers-danlos-syndrome-poppy-large-tease.jpg",
    },
    {
      title: "기사 제목 444",
      content: "가나다라마바사아자차카타파하가",
      broad: "CNN",
      src: "https://media.cnn.com/api/v1/images/stellar/prod/230324121916-01-germany-reichsbuerger-movement.jpg?c=16x9&q=h_720,w_1280,c_fill/f_webp",
    },
    {
      title: "기사 제목 555",
      content: "가나다라마바사아자차카타파하가",
      broad: "CNN",
      src: "https://cdn.cnn.com/cnnnext/dam/assets/230324080604-01-lorraine-schwartz-joopiter-sale-swift-restricted-large-tease.jpg",
    },
  ];
  return (
    <ComponentDiv>
      <div style={{ width: "100%" }}>
        <NewsCarouselDiv>
          <CarouselDiv>
            <CarouselCustom items={items} width="300px" height="180px"></CarouselCustom>
          </CarouselDiv>
        </NewsCarouselDiv>
      </div>
    </ComponentDiv>
  );
}

export default TrendNews;
