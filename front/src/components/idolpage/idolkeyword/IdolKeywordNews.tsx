import IdolKeywordNewsItem from "./IdolKeywordNewsItem";
import { NewsType } from "../../../_utils/Types";
import TitleComponent from "../TitleComponent"
import bg  from "../sampleImg/image 38.png"
import styled from "styled-components";
import { useAppSelector } from "../../../_hooks/hooks";

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

const newsList = [
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
  ]

  function IdolKeywordNews({ chooseKeywordIdx, keyWordNewsList }: Props) {

  // newsList[chooseKeywordIdx]이 배열인 경우에만 map 함수를 호출하도록 처리
  /* const keyWordNewsList: NewsType[] = Array.isArray(newsList[chooseKeywordIdx]) ? newsList[chooseKeywordIdx] as unknown as NewsType[] : []; */
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