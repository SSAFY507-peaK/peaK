import IdolKeywordNewsItem from "./IdolKeywordNewsItem";
import TitleComponent from "../TitleComponent"
import bg  from "../sampleImg/image 38.png"
import styled from "styled-components";

const Frame = styled.div`
  margin-bottom: 10px;
`;

const NewsFrame = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

function IdolKeywordNews() {
  return (
    <Frame>
      <TitleComponent blacktxt="관련" purpletxt="뉴스"/>
      <NewsFrame>
        <IdolKeywordNewsItem image={bg} title="1번 뉴스" summary="세븐틴 하이하이 바이바이 하이하이" source="billboard"/>
        <IdolKeywordNewsItem image={bg} title="1번 뉴스" summary="세븐틴 하이하이 바이바이 하이하이" source="billboard"/>
        <IdolKeywordNewsItem image={bg} title="1번 뉴스" summary="세븐틴 하이하이 바이바이 하이하이" source="billboard"/>
      </NewsFrame>
    </Frame>
  )
}

export default IdolKeywordNews