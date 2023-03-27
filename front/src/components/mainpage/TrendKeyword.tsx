import IdolKeywordRank from "../idolpage/idolkeyword/IdolKeywordRank";
import IdolKeywordWordCloud from "../idolpage/idolkeyword/IdolKeywordWordCloud";
import styled from "styled-components";
import { useState } from "react";

const LeftFrame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.4;
  margin-bottom: 10px;
`;
const ComponentDiv = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  padding: 40px;
  flex: 0.3;
  padding: 10px 30px;
  margin-bottom: 7.5px;
`;

function TrendKeyword() {
  const [chooseKeyword, setChooseKeyword] = useState<number>(0);
  return (
    <ComponentDiv>
      <LeftFrame>
        <IdolKeywordRank setChooseKeyword={setChooseKeyword} chooseKeyword={chooseKeyword} />
        <IdolKeywordWordCloud chooseKeyword={chooseKeyword} />
      </LeftFrame>
    </ComponentDiv>
  );
}

export default TrendKeyword;
