import ReactPlayer from "react-player/youtube";
import { TrendYoutubeListType } from "../../_utils/Types";
import styled from "styled-components";

// import ReactPlayer from "react-player/lazy";

type Props = {
  data: TrendYoutubeListType[];
};

const YoutubeListDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const YoutubeDiv = styled.div`
  width: 100%;
  aspect-ratio:  1.8 / 1 ;
  margin-bottom: 3vh;
  border-radius: 10px;
`;
function TrendingYoutube({ data }: Props) {
  const items = data;
  return (
    <YoutubeListDiv>
      {items.map(item => (
        <YoutubeDiv>
          <ReactPlayer
            url={item.url}
            width="100%"
            height="100%"
            light={true}
            controls={true}
          ></ReactPlayer>
        </YoutubeDiv>
      ))}
    </YoutubeListDiv>
  );
}

export default TrendingYoutube;
