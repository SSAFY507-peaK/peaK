import { useEffect, useState } from "react";

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
  // const [clickKeyword, setClickKeyword] = useState<boolean[]>([true, false, false, false, false])
  const [chooseKeyword, setChooseKeyword] = useState<number>(0)

  useEffect(() => {

  }, [chooseKeyword])

  return (
    <Frame>
      <LeftFrame>
        <IdolKeywordRank setChooseKeyword={setChooseKeyword} chooseKeyword={chooseKeyword} />
        <IdolKeywordWordCloud chooseKeyword={chooseKeyword} />
      </LeftFrame>
      <IdolKeywordNews chooseKeyword={chooseKeyword} />
    </Frame>
  )
}

export default IdolKeyword;