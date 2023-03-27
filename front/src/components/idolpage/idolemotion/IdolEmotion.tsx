import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import IdolEmotionChart from "./IdolEmotionChart";
import IdolEmotionChartBtn from "./IdolEmotionChartBtn";
import IdolEmotionRankChart from "./IdolEmotionRankChart";
import styled from "styled-components";
import { useState } from "react";

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  margin-bottom: 15px;
  padding: 20px;
`;

const Title = styled.h2`
  /* font-size: 2rem;
  font-weight: 700; */
  margin: 0px 10px 20px 0px;
  /* padding-left: 20px; */
  color: var(--purple500-color);
`;

const DataFrame = styled.div`
  display: flex;
  flex-direction: row;
`;

const ChartBtnFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0.3;
  margin-top: 10px;
`;

const ChartFrame = styled.div`
  flex: 0.6;
  /* margin: 0px 10px 10px 10px; */
`;


function IdolEmotion() {
  const [check, setCheck] = useState<boolean>(true);

  return(
    <Frame>
      <Title>차트</Title>
      <DataFrame>
        <ChartBtnFrame>
          <IdolEmotionChartBtn isTab = {check} ranknum="1위" rankicon={<ArrowDropUpIcon sx={{ color: "red"}} />} changenum={3} title="종합랭킹" onClick={() => check? setCheck(false) :setCheck(true)}></IdolEmotionChartBtn>
          <IdolEmotionChartBtn isTab = {!check} ranknum="81점" rankicon={<ArrowDropUpIcon  sx={{ color: "red"}} />} changenum={3} title="긍정지수" onClick={() => check? setCheck(false) :setCheck(true)}></IdolEmotionChartBtn>
        </ChartBtnFrame>
        <ChartFrame>
          {
            check 
            ?
            <IdolEmotionRankChart />
            :
            <IdolEmotionChart />
          }
        </ChartFrame>
      </DataFrame>
    </Frame>
  )
}
      
export default IdolEmotion;
