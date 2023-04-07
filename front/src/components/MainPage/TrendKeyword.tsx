import IdolKeywordRank from "../idolpage/idolkeyword/IdolKeywordRank";
import IdolKeywordWordCloud from "../idolpage/idolkeyword/IdolKeywordWordCloud";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {TrendKeywordsType} from "../../_utils/Types";

const ComponentDiv = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  height: 100%;
  //justify-content: space-between;
`;

function TrendKeyword({TrendKeywords}: any) {
  const [chooseKeyword, setChooseKeyword] = useState<number>(0);
  // const [wordDataList, setWordDataList] = useState<{word: number}>(TrendKeywords.wordCounter)
  // const [keyWordList, setKeyWordList] = useState<>
  const wordDataList = [];
  const keyWordList = []
  for (let keyword of TrendKeywords) {
    keyWordList.push(keyword.keyword);
    for (let data of keyword.wordCounter){
      wordDataList.push(data.objects.key)
    }
  }

  // 멋지게 10초마다 선택한 키워드 변경하고 싶었음..
  // useEffect(() => {
  //   const ChangeKeyword = setTimeout(() => {
  //     setChooseKeyword(prev => (prev + 1) % 5);
  //   }, 10000)
  //   return () => {clearTimeout(ChangeKeyword)}
  // }, [chooseKeyword])
  const [wordData, setWordData] = useState<any>([])
  useEffect(() => {
    setWordData(wordDataList[chooseKeyword])
  }, [chooseKeyword])

  return (
    <ComponentDiv>
      <IdolKeywordRank setChooseKeyword={setChooseKeyword} chooseKeyword={chooseKeyword} keyWordList={keyWordList}/>
      <IdolKeywordWordCloud chooseKeyword={chooseKeyword} wordData={wordData}/>
    </ComponentDiv>
  );
}

export default TrendKeyword;
