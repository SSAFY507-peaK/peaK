import WordCloud from 'react-d3-cloud';
import { faker } from '@faker-js/faker';
import styled from "styled-components";

interface Props {
  chooseKeyword: number;
}

const WordCloudFrame = styled.div`
  height: 15vh;
  width: 80%;
  border-radius: 100px;
  border: 10px;
  margin-top: 20px;
  margin-left: 20px;
  /* background-color: var(--gray800-color); */
  
`;


function IdolKeywordWordCloud ({chooseKeyword}:Props){
  
  const data = []
  for (let i=0;  i < 50; i++) {
    const tmp = {text: faker.datatype.string(5), value: faker.datatype.number({ min: 0, max: 100})}
    data.push(tmp)
  }

  return (
    <WordCloudFrame>
      <WordCloud
        data={data}
        fontSize={(word) => Math.log2(word.value) * 4} 
        width={400} 
        height={150} 
        rotate={(word) => word.value % 360}
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