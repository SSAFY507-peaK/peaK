import WordCloud from 'react-d3-cloud';
import { faker } from '@faker-js/faker';
import styled from "styled-components";

interface Props {
  chooseKeyword: number;
}

const WordCloudFrame = styled.div`
  /* height: 15vh; */
  width: 80%;
  border-radius: 200px;
  margin-left: 20px;
  background-color: var(--purple800-color);
  opacity: 0.5;
`;


function IdolKeywordWordCloud ({chooseKeyword}:Props){
  
  const data = []
  for (let i=0;  i < 50; i++) {
    const tmp = {text: faker.datatype.string(5), value: faker.datatype.number({ min: 0, max: 300})}
    data.push(tmp)
  }

  return (
    <WordCloudFrame>
      <WordCloud
        data={data}
        fontSize={(word) => Math.log2(word.value) * 4}
        spiral="rectangular"
        width={400} 
        height={300}
        rotate={(word) => {
          if (word.value % 4) {
            return (-45)
          } else if (word.value % 4 == 2) {
            return (0)
          } else if (word.value % 4 == 3) {
            return (45)
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