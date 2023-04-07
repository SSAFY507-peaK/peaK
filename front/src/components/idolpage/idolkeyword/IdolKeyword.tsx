import { useEffect, useState } from "react";

import IdolKeywordNews from "./IdolKeywordNews";
import IdolKeywordRank from "./IdolKeywordRank";
import IdolKeywordWordCloud from "./IdolKeywordWordCloud";
import TitleComponent from "../TitleComponent";
import styled from "styled-components";
import { useAppSelector } from "../../../_hooks/hooks";
import { NewsType, WordData } from "../../../_utils/Types";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Frame = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const LeftFrame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.4;
  padding: 20px;
  margin-right: 25px;
  background-color: white;
  border-radius: 15px;
`;

function IdolKeyword() {
  // const [clickKeyword, setClickKeyword] = useState<boolean[]>([true, false, false, false, false])
  const [chooseKeyword, setChooseKeyword] = useState<number>(0)
  const wordDataList = useAppSelector(state => state.idolDetailWordCount.wordCloud)
  const keyWordList = useAppSelector(state => state.idolDetailNews.keywordList)
  const keyWordNewsList = useAppSelector(state => state.idolDetailNews.newsList)

  const [wordData, setWordData] = useState<WordData[]>([])
  const [keyWordNews, setkeyWordNews] = useState<NewsType[]>([])
  useEffect(() => {
    setWordData(wordDataList[chooseKeyword])
    setkeyWordNews(keyWordNewsList[chooseKeyword])
  }, [chooseKeyword])

  return (
    <Wrapper>
      <TitleComponent blacktxt="인기" purpletxt="키워드" />
      <Frame>
        <LeftFrame>
          <IdolKeywordRank setChooseKeyword={setChooseKeyword} chooseKeyword={chooseKeyword} keyWordList={keyWordList}/>
          <IdolKeywordWordCloud chooseKeyword={chooseKeyword} wordData={wordData}/>
        </LeftFrame>
        <IdolKeywordNews chooseKeyword={chooseKeyword} keyWordNews={keyWordNews}/>
      </Frame>
    </Wrapper>
  )
}

export default IdolKeyword;