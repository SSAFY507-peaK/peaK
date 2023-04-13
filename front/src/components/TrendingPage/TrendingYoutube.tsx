import ReactPlayer from "react-player/youtube";
import { TrendYoutubeListType } from "../../_utils/Types";
import styled from "styled-components";

type Props = {
  data: TrendYoutubeListType[];
};

const YoutubeTitleContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const YoutubeListDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const YoutubeDiv = styled.div`
  width: 100%;
  aspect-ratio: 1.8 / 1;
  border-radius: 10px;
`;

/** 트렌딩 유튜브를 iframe으로 보여주는 함수 */
function TrendingYoutube({ data }: Props) {
  const items = data;

  return (
    <YoutubeListDiv>
      {items.map(item => (
        <YoutubeTitleContentDiv>
          <YoutubeDiv>
            <ReactPlayer
              url={item.url}
              width="100%"
              height="100%"
              light={true}
              controls={true}
            ></ReactPlayer>
          </YoutubeDiv>
          <h3>{item.title.length > 22 ? item.title.slice(0, 22) + "..." : item.title}</h3>
        </YoutubeTitleContentDiv>
      ))}
    </YoutubeListDiv>
  );
}

export default TrendingYoutube;
