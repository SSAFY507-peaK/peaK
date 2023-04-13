import { PosNeg, WeeklyRankingType } from '../../../_utils/Types';
import { useState } from "react";

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { ClickTracker } from '../../../_utils/UserTracker';
import IdolEmotionChart from "./IdolEmotionChart";
import IdolEmotionChartBtn from "./IdolEmotionChartBtn";
import IdolEmotionRankChart from "./IdolEmotionRankChart";
import styled from "styled-components";
import { useAppSelector } from '../../../_hooks/hooks';
import { useParams } from 'react-router';

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

  const userId:string = useAppSelector(state => state.userInfo.userId)
  const posNeg:PosNeg[] = useAppSelector(state => state.idolDetailChart.posNegWeek)
  const rankData:WeeklyRankingType = useAppSelector(state => state.idolDetailChart.rankData)
  if (posNeg.length === 1 && posNeg[0].pos === 0){
    return(
      <></>
    )
  } else {
    return(
      <DataFrame>
        <ChartBtnFrame>
          <IdolEmotionChartBtn
            isTab = {check}
            ranknum= {`${rankData.current.rank}위`}
            rankicon={<ArrowDropUpIcon sx={{ color: "red"}} />}
            color="red"
            changenum={3} 
            title="종합랭킹" 
            onClick={() => {
              ClickTracker(idolName, userId)
              return (
                !check ? setCheck(true) : null
              )
            }} />
          <IdolEmotionChartBtn 
            isTab = {!check} 
            ranknum={`${posNeg[6].pos}점`}
            rankicon={<ArrowDropUpIcon  sx={{ color: "red"}} />}
            color="red"
            changenum={3} 
            title="긍정지수" 
            onClick={() => {
              ClickTracker(idolName, userId)
              return (
                check? setCheck(false) : null
              )
            }}/>
        </ChartBtnFrame>
        <ChartFrame>
          {
            check 
            ?
            <IdolEmotionRankChart rankData={rankData} />
            :
            <IdolEmotionChart posNeg={posNeg} />
          }
        </ChartFrame>
      </DataFrame>
    )
  }
}
      
export default IdolEmotion;
