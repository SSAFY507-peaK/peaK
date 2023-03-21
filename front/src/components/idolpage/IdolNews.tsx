import FrameCommponent from "./FrameCommponent";
import IdolNewsItem from "./IdolNewsItem";
import styled from "styled-components";

const Title = styled.div`
  
`;

const WordCloud = styled.div`

`;

const NewsFrame = styled.div`
  display: flex;
  flex-direction: row;
`;

function IdolNews() {
  return (
    <FrameCommponent
      leftitem={
        <>
          <Title>오늘의 키워드</Title>
          <WordCloud>나는 워드클라우드</WordCloud>
        </>
      }
      rightitem={
        <>
          <Title>News &gt;</Title>
          <NewsFrame>
            <IdolNewsItem></IdolNewsItem>
          </NewsFrame>
        </>
      }
    ></FrameCommponent>
    
  )
}

export default IdolNews;