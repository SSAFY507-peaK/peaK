import styled from "styled-components";

interface DataType {
  ranknum: string;
  rankicon: any;
  changenum?: number;
  title: string;
  isTab: boolean;
  onClick: () => void;
}

interface TextType {
  size: string;
  fontweight?: string;
}

const ButtonFrameOn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  background: linear-gradient(130.91deg, #FA7474 7.03%, #CE0808 91.83%);
  box-shadow: 0px 4px 18px -5px #F84444;
  border-radius: 30px;
  width: 65%;
  flex: 0.4;
  margin-bottom: 10px;
  cursor: pointer;
`;

const ButtonFrameOff = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  width: 65%;
  flex: 0.4;
  margin-bottom: 10px;
  cursor: pointer;
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
`;

function IdolEmotionChartBtn({ ranknum, rankicon, changenum, title, isTab, onClick}: DataType) {
  if (isTab) {
    return (
    <ButtonFrameOn onClick={onClick}>
      <TextFrame>
        <TextValue size="1.3rem" fontweight="700">{ranknum}</TextValue>
        {rankicon}
        <TextValue size="0.6rem">{changenum}</TextValue>
      </TextFrame >
      <TextFrame>{title}</TextFrame>
    </ButtonFrameOn>
    )
  } else {
    return(
    <ButtonFrameOff onClick={onClick}>
      <TextFrame>
        <TextValue size="1.3rem" fontweight="700">{ranknum}</TextValue>
        {rankicon}
        <TextValue size="0.7rem">{changenum}</TextValue>
      </TextFrame>
      <TextFrame>{title}</TextFrame>
    </ButtonFrameOff>
    )
  }
}

export default IdolEmotionChartBtn;