import { useState } from "react";

import IdolKeywordNews from "./IdolKeywordNews";
import IdolKeywordRank from "./IdolKeywordRank";
import IdolKeywordWordCloud from "./IdolKeywordWordCloud";
import TitleComponent from "../TitleComponent";
import styled from "styled-components";
import { useAppSelector } from "../../../_hooks/hooks";
import { NewsType } from "../../../_utils/Types";

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
  const [chooseKeywordIdx, setChooseKeywordIdx] = useState<number>(0)
  const wordDataList = useAppSelector(state => state.idolDetailWordCount.wordCloud)
  let keyWordList = useAppSelector(state => state.idolDetailNews.keywordList)
  let keyWordNewsList:NewsType[][] = useAppSelector(state => state.idolDetailNews.newsList)
  
  const keywordCount:number = keyWordList.length


  const getChooseKeyword = (value:number) => {
    setChooseKeywordIdx(value)
  };

  if (keywordCount === 0) {
    keyWordNewsList = [[{
      press: "",
      title: "뉴스 데이터가 존재하지 않습니다.",
      summary: "",
      link: "",
      thumbnailLink: ""
    }]]
    keyWordList = [
      "키워드 데이터가 존재하지 않습니다.",
      "키워드 데이터가 존재하지 않습니다.",
      "키워드 데이터가 존재하지 않습니다.",
      "키워드 데이터가 존재하지 않습니다.",
      "키워드 데이터가 존재하지 않습니다."
    ]
    return(
      <Wrapper>
        <TitleComponent blacktxt="인기" purpletxt="키워드" />
        <Frame>
          <LeftFrame>
            <IdolKeywordRank getChooseKeyword={getChooseKeyword} chooseKeywordIdx={chooseKeywordIdx} keyWordList={keyWordList}/>
            <IdolKeywordWordCloud chooseKeywordIdx={chooseKeywordIdx} />
          </LeftFrame>
          <IdolKeywordNews chooseKeywordIdx={chooseKeywordIdx} keyWordNewsList={keyWordNewsList}/>
        </Frame>
      </Wrapper>)
  } else {
    if( keywordCount < 5) {
      for (let i = keywordCount; i<5 ; i++){
        keyWordList.push("키워드가 없습니다.")
      }
    }
    return (
      <Wrapper>
        <TitleComponent blacktxt="인기" purpletxt="키워드" />
        <Frame>
          <LeftFrame>
            <IdolKeywordRank getChooseKeyword={getChooseKeyword} chooseKeywordIdx={chooseKeywordIdx} keyWordList={keyWordList}/>
            <IdolKeywordWordCloud chooseKeywordIdx={chooseKeywordIdx} wordData={wordDataList}/>
          </LeftFrame>
          <IdolKeywordNews chooseKeywordIdx={chooseKeywordIdx} keyWordNewsList={keyWordNewsList}/>
        </Frame>
      </Wrapper>
    )
  }
}

export default IdolKeyword;