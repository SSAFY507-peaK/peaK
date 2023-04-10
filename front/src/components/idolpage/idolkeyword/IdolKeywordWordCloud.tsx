import WordCloud from 'react-d3-cloud';
import { faker } from '@faker-js/faker';
import styled from "styled-components";
import { useAppSelector } from '../../../_hooks/hooks';
import { Button, Tooltip } from '@mui/material';
import { WordData } from '../../../_utils/Types';

interface Props {
  chooseKeyword: number;
  wordData: WordData[];
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


function IdolKeywordWordCloud ({chooseKeyword, wordData}:Props){
  // console.log(wordData)
  // const wordCloud = useAppSelector(state => state.idolDetailNews.wordCloud)
  // console.log(wordCloud[chooseKeyword])
  // const wordData = []
  // for (let i=0;  i < 30; i++) {
  //   const tmp = {text: faker.datatype.string(5), value: faker.datatype.number({ min: 0, max: 200})}
  //   wordCloud.push(tmp)
  // }

  return (
    <WordCloudFrame>
      <WordCloud
        // data={wordCloud[chooseKeyword]}
        data={wordData}
        fontSize={(word) => Math.log2(word.value) * 3}
        // spiral="rectangular"
        width={300} 
        height={150}
        // padding={5}
        rotate={(word) => {
          if (word.value % 2) {
            return (0)
          } else {
            return (90)
          }
        }}
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