import styled from "styled-components";

interface NewsDataType {
  image: string;
  title: string;
  summary: string;
  source: string;
}

const Frame = styled.div`
  display: flex;
  flex-direction: row;
  flex: 0.2;
  margin-bottom: 10px;
`;

const NewsImg = styled.img` 
  flex: 0.3;
  border-radius: 20px;
  background-size: cover;
  width: 100px;
  margin: 0px 20px 10px 10px;
`;

const NewsDataFrame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.7 ;
  justify-content: space-evenly;
`;

const NewsTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const NewsDetail = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  padding-right: 100px;
`;

const NewsSource = styled.div`
  font-size: 0.8rem;
  opacity: 0.5;  
`;


function IdolKeywordNewsItem({image, title, summary, source}: NewsDataType) {
  return (
    <Frame>
      <NewsImg src={image} />
      <NewsDataFrame>
        <NewsTitle>{title}</NewsTitle>
        <NewsDetail>{summary}</NewsDetail>
        <NewsSource>{source}</NewsSource>
      </NewsDataFrame>
    </Frame>
  )
}

export default IdolKeywordNewsItem;