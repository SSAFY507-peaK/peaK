import ReactWordcloud from 'react-wordcloud';
import { faker } from '@faker-js/faker';
import styled from "styled-components";

const WordCloudFrame = styled.div`
  height: 200px;
  border-radius: 100px;
  background-color: var(--gray800-color);
  
`;

function IdolKeywordWordCloud (){

  const dumy = []

  for (let i=0;  i < 50; i++) {
    const tmp = {text: faker.datatype.string(5), value: faker.datatype.number({ min: 0, max: 1000})}
    dumy.push(tmp)
  }

  return (
    <WordCloudFrame>
      <ReactWordcloud words={dumy} />
    </WordCloudFrame>
  )
}

export default IdolKeywordWordCloud;