import Emotion from "./sampleImg/Emotion.png"
import FrameCommponent from './FrameComponent';
import HelpIcon from '@mui/icons-material/Help';
import TabComponent from "./TagComponent";
import styled from "styled-components";
import { useState } from "react";

const Title = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;

const EmotionImgFrame = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: flex-end;
`;

const EmotionImg = styled.img`
  width: 50%;
`;

const EmotionScore = styled.div`
  
`;

const ChartTagFrame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const EmotionChart = styled.div`

`;

const RankingChart = styled.div`

`;


function IdolEmotion() {
  const [check, setCheck] = useState<boolean>(true);
  return(
    <FrameCommponent
      leftitem={
        <>
          <Title>오늘의 긍정지수</Title>
          <EmotionImgFrame>
            <EmotionImg src={Emotion} />
            <EmotionScore>91점</EmotionScore>
          </EmotionImgFrame>
        </>
      }
      rightitem={
        <>
          <Title>긍정지수/랭킹 차트</Title>
          <ChartTagFrame>
            <TabComponent isTab = {check} title = "긍부정 차트" size ="1.5rem" onClick={() => check? setCheck(false) :setCheck(true)}></TabComponent>
            <TabComponent isTab = {!check} title = "랭킹 차트" size ="1.5rem" onClick={() => check? setCheck(false) :setCheck(true)}></TabComponent>
            <HelpIcon sx={{ color: "lightgray" }} />
          </ChartTagFrame>
          {
            check 
            ?
            <EmotionChart>나는 감정 차트야</EmotionChart>
            :
            <RankingChart>나는 랭킹 차트야</RankingChart>
          }
        </>
        }
    ></FrameCommponent>
  )
}
      
export default IdolEmotion;
