import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { ClickTracker } from '../ClickTracker';
import IdolEmotionChart from "./IdolEmotionChart";
import IdolEmotionChartBtn from "./IdolEmotionChartBtn";
import IdolEmotionRankChart from "./IdolEmotionRankChart";
import styled from "styled-components";
import { useParams } from 'react-router';
import { useState } from "react";

const DataFrame = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  margin-bottom: 25px;
`;

const ChartBtnFrame = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: space-between;
  flex: 0.3;
  height: 30vh;
`;

const ChartFrame = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 20px 60px 20px 60px;
  flex: 0.7;
  height: 30vh;
  border-radius: 20px;
`;


function IdolEmotion() {
  const [check, setCheck] = useState<boolean>(true);
  const params = useParams();
  const idolName:string = params.idolName || "";

  return(
    <DataFrame>
      <ChartBtnFrame>
        <IdolEmotionChartBtn
          isTab = {check}
          ranknum="1위"
          rankicon={<ArrowDropUpIcon sx={{ color: "red"}} />}
          color="red"
          changenum={3} 
          title="종합랭킹" 
          onClick={() => {
            !check ? setCheck(true) : null
            ClickTracker(idolName,"chohm1223@naver.com")
          }} />
        <IdolEmotionChartBtn 
          isTab = {!check} 
          ranknum="81점" 
          rankicon={<ArrowDropUpIcon  sx={{ color: "red"}} />}
          color="red"
          changenum={3} 
          title="긍정지수" 
          onClick={() => {
            check? setCheck(false) : null
            ClickTracker(idolName,"chohm1223@naver.com")
          }}/>
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
  )
}
      
export default IdolEmotion;
