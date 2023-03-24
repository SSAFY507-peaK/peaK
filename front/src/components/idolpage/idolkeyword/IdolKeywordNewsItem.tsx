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
  border-radius: 30px;
  background-size: cover;
  width: 150px;
  /* width: 150px;
  height: 100px; */
`;

const NewsDataFrame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.7 ;
`;

const NewsTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
`;

const NewsDetail = styled.div`

`;

const NewsSource = styled.div`
  
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