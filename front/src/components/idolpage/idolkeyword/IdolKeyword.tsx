import IdolKeywordNews from "./IdolKeywordNews";
import IdolKeywordRank from "./IdolKeywordRank";
import IdolKeywordWordCloud from "./IdolKeywordWordCloud";
import styled from "styled-components";

const Frame = styled.div`
  display: flex;
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  width: 100%;
`;

const LeftFrame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.4;
  margin-bottom: 10px;
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