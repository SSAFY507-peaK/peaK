import { Button, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';

import WordCloud from 'react-d3-cloud';
import { WordData } from '../../../_utils/Types';
import { faker } from '@faker-js/faker';
import styled from "styled-components";
import { useAppSelector } from '../../../_hooks/hooks';

interface Props {
  chooseKeywordIdx: number;
  wordData: WordData[][];
}

const WordCloudFrame = styled.div`
  /* height: 15vh; */
  width: 100%;
  border-radius: 70px;
  //margin-left: 20px;
  //margin-top: 10px;
  background-color: #f4f2f5;
  box-shadow: 1px 3px 1px #cfcdcd;
  opacity: 0.5;
`;


// function IdolKeywordWordCloud ({ chooseKeywordIdx }:Props){
  function IdolKeywordWordCloud ({chooseKeywordIdx, wordData}:Props){
  // console.log(wordData)
  // const wordCloud = useAppSelector(state => state.idolDetailNews.wordCloud)
  // console.log(wordCloud[chooseKeywordIdx])
  // const wordData = []
  // for (let i=0;  i < 30; i++) {
  //   const tmp = {text: faker.datatype.string(5), value: faker.datatype.number({ min: 0, max: 200})}
  //   wordCloud.push(tmp)
  // }
  // const wordDataList = useAppSelector(state => state.idolDetailWordCount.wordCloud[chooseKeywordIdx])
  // console.log(wordDataList)
  const data = [{
    text: "왱노런밀",
    value: 300
  },
  {
    text: "왱노런밀",
    value: 300
  }]

  return (
    <WordCloudFrame>
      <WordCloud
        data={data}
        // data={wordData[chooseKeywordIdx]}
        // fontSize={(word) => Math.log2(word.value) * 3}
        // spiral="rectangular"
        width={300} 
        height={150}
        // padding={5}
        // rotate={(word) => {
        //   if (word.value % 2) {
        //     return (0)
        //   } else {
        //     return (90)
        //   }
        // }}
        // fontStyle="inherit"
        // onWordClick={(event, d) => {
        //   console.log(`onWordClick: ${d.text}`);
        // }}
        // onWordMouseOver={(event, d) =>{
          
        // }}
        // onWordMouseOut={(event, d) => {
        //   console.log(`onWordMouseOut: ${d.text}`);
        // }}
      />
    </WordCloudFrame>
  )
}

export default IdolKeywordWordCloud;