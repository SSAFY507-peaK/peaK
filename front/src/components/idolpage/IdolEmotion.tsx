import FrameCommponent from './FrameComponent';
import HelpIcon from '@mui/icons-material/Help';
import styled from "styled-components";

const Title = styled.div`
  
`;

const EmotionImg = styled.div`
  
`;

const ChartTagFrame = styled.div`
  display: flex;
  flex-direction: row;
`;

const ChartTag = styled.div`
  
`;

const EmotionChart = styled.div`

`;

function IdolEmotion() {
  return(
    <FrameCommponent
      leftitem={
        <>
          <Title>오늘의 긍정지수</Title>
          <EmotionImg>아이콘 이미지</EmotionImg>
        </>
      }
      rightitem={
        <>
          <Title>긍정지수/랭킹 차트</Title>
          <ChartTagFrame>
            <ChartTag>긍부정 차트</ChartTag>
            <ChartTag>랭킹 차트</ChartTag>
            <HelpIcon sx={{ color: "lightgray" }} />
          </ChartTagFrame>
          <EmotionChart>나는 감정 차트야</EmotionChart>
        </>
      }
      ></FrameCommponent>
  )
}

export default IdolEmotion;