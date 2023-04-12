import styled from "styled-components";

interface NewsDataType {
  image: string;
  title: string;
  summary: string;
  source: string;
  link: string;
}

const Frame = styled.div`
  display: flex;
  flex-direction: row;
  flex: 0.2;
  padding: 5px;
  cursor: pointer;
`;

const NewsImg = styled.img` 
  flex: 0.3;
  border-radius: 15px;
  background-size: cover;
  width: 100px;
  height: 100px;
  margin-right: 10px;
`;

const NewsDataFrame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.7;
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
  padding-right: 30px;
`;

const NewsSource = styled.div`
  font-size: 0.8rem;
  opacity: 0.5;  
`;


function IdolKeywordNewsItem({image, title, summary, source, link}: NewsDataType) {
  return (
    <Frame onClick={() => window.open(link)}>
      <NewsImg src={image} />
      <NewsDataFrame>
        <NewsTitle>{title}</NewsTitle>
        <NewsDetail>{summary.length <= 30 ? summary : summary.substring(0, 40) + "..."}</NewsDetail>
        <NewsSource>{source}</NewsSource>
      </NewsDataFrame>
    </Frame>
  )
}

export default IdolKeywordNewsItem;