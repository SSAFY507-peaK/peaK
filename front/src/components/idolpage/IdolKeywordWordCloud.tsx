import ReactWordcloud from 'react-wordcloud';
import styled from "styled-components";

function IdolKeywordWordCloud (){
  const words = [
    {
      text: 'told',
      value: 64,
    },
    {
      text: 'mistake',
      value: 400,
    },
    {
      text: 'thought',
      value: 100,
    },
    {
      text: 'bad',
      value: 30,
    },
  ]
  return (
    <ReactWordcloud words={words} />
  )
}

export default IdolKeywordWordCloud;