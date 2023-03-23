import FrameCommponent from "./FrameComponent";
import IdolNewsItem from "./IdolNewsItem";
import IdolNewsWordCloud from "./IdolNewsWordCloud";
import styled from "styled-components";

const Title = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;

const WordCloudFrame = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const NewsFrame = styled.div`
  display: flex;
  flex-direction: row;
`;

function IdolKeyword() {
  return (
    <FrameCommponent
      leftitem={
        <>
          <Title>오늘의 키워드</Title>
          <WordCloudFrame>
            <IdolNewsWordCloud />
          </WordCloudFrame>
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

export default IdolKeyword;