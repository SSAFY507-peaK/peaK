import WordCloud from 'react-d3-cloud';
import { faker } from '@faker-js/faker';
import styled from "styled-components";

interface Props {
  chooseKeyword: number;
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


function IdolKeywordWordCloud ({chooseKeyword}:Props){
  
  const data = []
  for (let i=0;  i < 30; i++) {
    const tmp = {text: faker.datatype.string(5), value: faker.datatype.number({ min: 0, max: 200})}
    data.push(tmp)
  }

  return (
    <WordCloudFrame>
      <WordCloud
        data={data}
        fontSize={(word) => Math.log2(word.value) * 4}
        spiral="rectangular"
        width={300} 
        height={150}
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
        // onWordMouseOver={(event, d) => {
        //   console.log(`onWordMouseOver: ${d.text}`);
        // }}
        // onWordMouseOut={(event, d) => {
        //   console.log(`onWordMouseOut: ${d.text}`);
        // }}
      />

    </WordCloudFrame>
  )
}

export default IdolKeywordWordCloud;