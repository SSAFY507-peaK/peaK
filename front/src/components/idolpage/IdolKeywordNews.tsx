import styled from "styled-components";

const NewsImg = styled.div` 

`;

const NewsDataFrame = styled.div`
  display: flex;
  flex-direction: column;
`;

const NewsTitle = styled.div`

`;

const NewsDetail = styled.div`

`;

const NewsSource = styled.div`
  
`;


function IdolKeywordNews() {
  return (
    <>
      <NewsImg>나는 뉴스 이미지</NewsImg>
      <NewsDataFrame>
        <NewsTitle>나는야 뉴스제목</NewsTitle>
        <NewsDetail>나는야 뉴스내용내용내용</NewsDetail>
        <NewsSource>나는 출처</NewsSource>
      </NewsDataFrame>
    </>
  )
}

export default IdolKeywordNews;