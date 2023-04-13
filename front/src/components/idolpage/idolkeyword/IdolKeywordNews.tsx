import IdolKeywordNewsItem from "./IdolKeywordNewsItem";
import { NewsType } from "../../../_utils/Types";
import styled from "styled-components";

interface Props {
  chooseKeywordIdx: number;
  keyWordNewsList: NewsType[][];
}

const Frame = styled.div`
  flex: 0.6;
  background-color: white;
  border-radius: 15px;
  padding: 20px
`;

const NewsFrame = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

  function IdolKeywordNews({ chooseKeywordIdx, keyWordNewsList }: Props) {

  return (
    <Frame>
      <NewsFrame>
        {
          keyWordNewsList[chooseKeywordIdx].map((e: NewsType, idx: number) => {
            return (
              <IdolKeywordNewsItem
                key={idx}
                image={e.thumbnailLink}
                title={e.title}
                summary={e.summary}
                source={e.press}
                link={e.link}
              />
            );
          })
        }
      </NewsFrame>
    </Frame>
  );
}

export default IdolKeywordNews;