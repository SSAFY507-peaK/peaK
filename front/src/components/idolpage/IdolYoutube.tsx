import IdolYoutubeCarousel from './IdolYoutubeCarousel';
import YouTubeIcon from '@mui/icons-material/YouTube';
import styled from "styled-components";

const Frame = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleFrame = styled.div`
  display: flex;
  flex-direction: row;
`;


const Title = styled.div`
  
`;

function IdolYoutube () {
  return (
    <Frame>
      <TitleFrame>
        <Title>Youtube</Title>
        <YouTubeIcon sx={{ color: "red" }} />
      </TitleFrame>
      <IdolYoutubeCarousel />
    </Frame>
  )
}

export default IdolYoutube;