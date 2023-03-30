import IdolKeywordRank from "../idolpage/idolkeyword/IdolKeywordRank";
import IdolKeywordWordCloud from "../idolpage/idolkeyword/IdolKeywordWordCloud";
import styled from "styled-components";
import { useState } from "react";

const ComponentDiv = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  flex: 0.3;
`;

function TrendKeyword() {
  const [chooseKeyword, setChooseKeyword] = useState<number>(0);
  return (
    <ComponentDiv>
      <IdolKeywordRank setChooseKeyword={setChooseKeyword} chooseKeyword={chooseKeyword} />
      <IdolKeywordWordCloud chooseKeyword={chooseKeyword} />
    </ComponentDiv>
  );
}

export default TrendKeyword;
