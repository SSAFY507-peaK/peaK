import { faker } from '@faker-js/faker';
import styled from "styled-components";
import WordCloud from 'react-d3-cloud';



const WordCloudFrame = styled.div`
  height: 15vh;
  width: 80%;
  border-radius: 100px;
  background-color: var(--gray800-color);
`;


function IdolKeywordWordCloud (){
  
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
        width={300} 
        height={150} 
        rotate={(word) => word.value % 360} 
      />
    </WordCloudFrame>
  )
}

export default IdolKeywordWordCloud;