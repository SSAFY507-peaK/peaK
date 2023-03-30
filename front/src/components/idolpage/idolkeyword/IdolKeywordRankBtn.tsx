import styled from 'styled-components'

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
  border-radius: 30px;
  /* padding: 5px 5px 5px 5px; */
  margin: 5px 10px 5px 0px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
`;

const RankFrame = styled.div`
  /* flex: 0.1; */
  width: 30px;
  height: 30px;
  background: linear-gradient(151.76deg, #A869CD 9.32%, #76349D 84.76%);
  border-radius: 20px;
  color: white;
  text-align: center;
  padding: 5px;
`;

const TextFrame = styled.div`
  flex: 0.9;
  text-align: left;
  padding: 10px;
  margin-left: 10px;
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