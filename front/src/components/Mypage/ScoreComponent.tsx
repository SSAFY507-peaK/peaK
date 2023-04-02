import styled from "styled-components";

interface FontType {
  score: string;
  title: string;
  size?: string;
  fsize?: string;
  color?: string;
  pd?: string;
  opacity?: string;
}

interface ScoreType {
 size?: string; 
 color?: string;
}

interface FrameType {
  pd?: string;
}

interface TitleType {
  fsize?: string;
  opacity?: string;
}

const Frame = styled.div<FrameType>`
  display: flex;
  flex-direction: column;
  padding: ${props => props.pd || "0px"}
`;

const Score = styled.div<ScoreType>`
  font-size: ${props => props.size || "1.2rem"};
  color: ${props => props.color || "null"};
  font-weight: 700;
  margin-bottom: 5px;
`; 

const Title = styled.div<TitleType>`
  font-size: ${props => props.fsize || "1.2rem"};
  opacity: ${props => props.opacity || "1"}
`;

function ScoreComponent({score, title, size, fsize, color, pd, opacity}:FontType) {
  return (
    <Frame pd={pd}>
      <Score color={color} size={size}>{score}</Score>
      <Title opacity={opacity} fsize={fsize} >{title}</Title>
    </Frame>
  )
}

export default ScoreComponent;