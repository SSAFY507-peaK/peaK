
import WordCloud from 'react-d3-cloud';
import { WordData } from '../../../_utils/Types';
import styled from "styled-components";

interface Props {
  chooseKeywordIdx: number;
  wordData?: WordData[][];
}

const WordCloudFrame = styled.div`
  width: 100%;
  border-radius: 70px;
  opacity: 0.5;
`;


  function IdolKeywordWordCloud ({chooseKeywordIdx, wordData}:Props){
  let wordDataList = [];
  if (wordData) {
    for (let i = 0; i<wordData[chooseKeywordIdx].length; i++) {
      wordDataList.push({text: wordData[chooseKeywordIdx][i].text, value: wordData[chooseKeywordIdx][i].value*61})
    }
  }
  return (
    <WordCloudFrame>
      <WordCloud
        data={wordDataList}
        fontSize={(word) => Math.log2(word.value) * 3}
        spiral="rectangular"
        width={300} 
        height={150}
        padding={5}
        rotate={(word) => {
          if (word.value % 2) {
            return (0)
          } else {
            return (90)
          }
        }}
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