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
  margin-left: 5px;
  margin-right: 7.5px;
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const NewsCarouselDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const CarouselDiv = styled.div`
  width: 80%;
`;

const PurpleH2 = styled.h2`
  color: var(--purple400-color);
  margin-left: 5px;
`;

function TrendNews() {
  const items = [
    {
      title: "기안 84, 84세가 아닌 것으로 밝혀져..",
      content:
        "가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하 abcdefghijklmnopqrstuvwxyz 기사 내용 111",
      broad: "CNN",
      src: "https://ssl.pstatic.net/mimgnews/image/311/2023/03/27/0001573560_001_20230327090103026.jpg?type=w540",
    },
    {
      title: "BTS.. 흑역사라고 주장",
      content:
        "가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하 abcdefghijklmnopqrstuvwxyz 기사 내용 111",
      broad: "CNN",
      src: "https://pbs.twimg.com/media/BNBGSmGCAAAbOfq.png",
    },
    {
      title: "기사 제목 333",
      content:
        "가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하 abcdefghijklmnopqrstuvwxyz 기사 내용 111",
      broad: "CNN",
      src: "https://ssl.pstatic.net/mimgnews/image/311/2023/03/27/0001573560_001_20230327090103026.jpg?type=w540",
    },
    {
      title: "기사 제목 444",
      content:
        "가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하 abcdefghijklmnopqrstuvwxyz 기사 내용 111",
      broad: "CNN",
      src: "https://pbs.twimg.com/media/BNBGSmGCAAAbOfq.png",
    },
    {
      title: "기사 제목 555",
      content:
        "가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하 abcdefghijklmnopqrstuvwxyz 기사 내용 111",
      broad: "CNN",
      src: "https://ssl.pstatic.net/mimgnews/image/311/2023/03/27/0001573560_001_20230327090103026.jpg?type=w540",
    },
  ];
  return (
    <ComponentDiv>
      <TitleDiv>
        <h2>트렌딩</h2>
        <PurpleH2> 뉴스</PurpleH2>
      </TitleDiv>
      <div style={{ width: "100%" }}>
        <NewsCarouselDiv>
          <CarouselDiv>
            <CarouselCustom items={items} width="400px" height="180px"></CarouselCustom>
          </CarouselDiv>
        </NewsCarouselDiv>
      </div>
    </ComponentDiv>
  );
}

export default TrendNews;
