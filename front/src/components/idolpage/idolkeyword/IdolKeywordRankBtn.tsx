import styled from 'styled-components';

interface BtnType {
  rank: string;
  keyword: string;
  isClick: boolean;
  onClick: () => void;
}

interface FrameType {
  isClick: boolean;
}

const Frame = styled.div<FrameType>`
  display: flex;
  flex-direction: row;
  background: ${props => props.isClick ?`rgba(235, 221, 243, 0.6)`: null};
  opacity: ${props => props.isClick ? null : 0.5 };
  height: 38px;
  width: 100%;
  padding: 5px;
  border-radius: 30px;
  
  margin-bottom: 7px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  transition: all 100ms ease-in-out;
  transform: ${props => props.isClick ? `scale(1.05, 1.05)` : null};
  &:hover{
    transform: ${props => props.isClick ? `scale(1.05, 1.05)` : "scale(1.02, 1.02)"};
    background: ${props => props.isClick ? `var(--purple800-color)` : "var(--gray800-color)"};
  }
`;

const RankFrame = styled.div`
  height: 100%;
  aspect-ratio: 1;
  background: linear-gradient(151.76deg, #A869CD 9.32%, #76349D 84.76%);
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  //text-align: center;
  padding: 5px;
`;

const TextFrame = styled.div`
  flex: 1;
  text-align: left;
  margin-left: 15px;
  font-size: 14px;
`;


function IdolKeywordRankBtn({rank, keyword, isClick, onClick}: BtnType) {
  return (
    <Frame 
      onClick={onClick}
      isClick={isClick}
    >
      <RankFrame>{rank}</RankFrame>
      <TextFrame>{keyword}</TextFrame>
    </Frame>
  )
}

export default IdolKeywordRankBtn;