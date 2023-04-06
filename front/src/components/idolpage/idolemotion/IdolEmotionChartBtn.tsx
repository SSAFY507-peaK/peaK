import styled from "styled-components";

interface DataType {
  ranknum: string;
  rankicon: any;
  changenum?: number;
  title: string;
  isTab: boolean;
  color: string;
  onClick: () => void;
}

interface TextType {
  isTab: boolean;
  size: string;
  fontweight?: string;
}

const ButtonFrameOn = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: flex-end;
  background: linear-gradient(130.91deg, #A869CD 7.03%, #76349D 91.83%);
  border-radius: 15px;
  width: 85%;
  flex: 0.45;
  cursor: pointer;
  padding: 20px;
`;

const ButtonFrameOff = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: flex-end;
  background: white;
  border-radius: 15px;
  width: 85%;
  flex: 0.45;
  cursor: pointer;
  padding: 20px;
`;

const TextFrame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  `;

const TextValue = styled.p<TextType>`
  font-size: ${props => props.size};
  font-weight: ${props => props.fontweight};
  margin: 0px;
  color: ${props => props.isTab ? "white" : "black"}
`;

const TextRank = styled.p`
  font-size: 0.6rem;
  color: ${props => props.color};
`;

function IdolEmotionChartBtn({ ranknum, rankicon, changenum, title, isTab, color, onClick}: DataType) {
  if (isTab) {
    return (
    <ButtonFrameOn onClick={onClick}>
      <TextFrame>
        <TextValue isTab={isTab} size="1.3rem" fontweight="700">{ranknum}</TextValue>
        {rankicon}
        <TextRank color={color}>{changenum}</TextRank>
      </TextFrame >
      <TextValue isTab={isTab} size="0.7rem">{title}</TextValue>
    </ButtonFrameOn>
    )
  } else {
    return(
    <ButtonFrameOff onClick={onClick}>
      <TextFrame>
        <TextValue isTab={isTab} size="1.3rem" fontweight="700">{ranknum}</TextValue>
        {rankicon}
        <TextRank color={color} >{changenum}</TextRank>
      </TextFrame>
      <TextValue isTab={isTab} size="0.7rem">{title}</TextValue>
    </ButtonFrameOff>
    )
  }
}

export default IdolEmotionChartBtn;