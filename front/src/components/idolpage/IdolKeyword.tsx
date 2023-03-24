import IdolKeywordNews from "./IdolKeywordNews";
import IdolKeywordRank from "./IdolKeywordRank";
import IdolKeywordWordCloud from "./IdolKeywordWordCloud";
import styled from "styled-components";

const Frame = styled.div`
  display: flex;
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 30px;
`;

const LeftFrame = styled.div`
  flex: 0.5;

`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;


function IdolKeyword() {
  return (
    <Frame>
      <LeftFrame>
        <IdolKeywordRank />
        <IdolKeywordWordCloud />
      </LeftFrame>
      <IdolKeywordNews />
    </Frame>
  )
}

export default IdolKeyword;