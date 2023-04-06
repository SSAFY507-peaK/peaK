import IdolKeywordNewsItem from "./IdolKeywordNewsItem";
import TitleComponent from "../TitleComponent"
import bg  from "../sampleImg/image 38.png"
import styled from "styled-components";
import { useAppSelector } from "../../../_hooks/hooks";
import { NewsType } from "../../../_utils/Types";

interface Props {
  chooseKeyword: number;
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

/* const newsList = [
  {  
    press: "billboard",
    title: "1번 뉴스",
    summary: "세븐틴 하이하이 바이바이 하이하이 아이오오 우에우에요히히히ㅣㅎ",
    link: "aaaaa",
    thumbnailLink: `${bg}`
  },
  {  
    press: "billboard",
    title: "2번 뉴스",
    summary: "세븐틴 하이하이 바이바이 하이하이",
    link: "bbbbb",
    thumbnailLink: `${bg}`
  },
  {  
    press: "billboard",
    title: "3번 뉴스",
    summary: "세븐틴 하이하이 바이바이 ",
    link: "ccccc",
    thumbnailLink: `${bg}`
  },
  {  
    press: "billboard",
    title: "4번 뉴스",
    summary: "세븐틴 하이하이 바이바이 하이하이 바이바이",
    link: "ddddd",
    thumbnailLink: `${bg}`
  },
  ] */

  function IdolKeywordNews({ chooseKeyword }: Props) {
  const newsList: NewsType[] = useAppSelector(state => state.idolDetailNews.newsList);
  console.log(newsList);

  // newsList[chooseKeyword]이 배열인 경우에만 map 함수를 호출하도록 처리
  const keywordNews: NewsType[] = Array.isArray(newsList[chooseKeyword]) ? newsList[chooseKeyword] as unknown as NewsType[] : [];

  return (
    <Frame>
      <NewsFrame>
        {
          keywordNews.map((e: NewsType, idx: number) => {
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