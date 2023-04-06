import IdolKeywordNewsItem from "./IdolKeywordNewsItem";
import TitleComponent from "../TitleComponent"
import bg  from "../sampleImg/image 38.png"
import styled from "styled-components";
import { useAppSelector } from "../../../_hooks/hooks";

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

function IdolKeywordNews({chooseKeyword}:Props) {
  /* const newsList = useAppSelector(state => state.idolDetailNews.newsList[chooseKeyword]) */

  return (
    <Frame>
      <NewsFrame>
      {
        newsList.map((e, idx) => {
          return( <IdolKeywordNewsItem image={e.thumbnailLink} title={e.title} summary={e.summary} source={e.press}  /> )
        })
      }
      </NewsFrame>
    </Frame>
  )
}

export default IdolKeywordNews