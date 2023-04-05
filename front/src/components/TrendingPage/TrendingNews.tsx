import { TrendNewsListType } from "../../_utils/Types";
import styled from "styled-components";

type NewsType = {
  link: string;
  thumbnailLink: string;
  title: string;
  summary: string;
  press: string;
};

type Props = {
  data: TrendNewsListType[];
};

type NewsProfileType = {
  url: string;
};

const NewsListDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const NewsDiv = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 4vh;
  transition: all 100ms ease-in-out;
  &:hover {
    transform: scale(1.01, 1.01);
    cursor: pointer;
  }
`;

const NewsProfile = styled.div<NewsProfileType>`
  background-image: url(${props => props.url});
  width: 25%;
  height: 8vw;
  background-size: cover;
  background-position: center 25%;
  border-radius: 15px;
`;

const NewsInfo = styled.div`
  margin: 1vh 2vh;
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NewsTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const NewsContent = styled.div`
  font-size: 12px;
`;

const NewsPress = styled.div`
  font-size: 10px;
  color: #848484f1;
`;

function TrendingNews({ data }: Props) {
  const items = data;
  return (
    <NewsListDiv>
      {items.map((item: NewsType) => (
        <NewsDiv onClick={() => window.open(item.link)}>
          <NewsProfile url={item.thumbnailLink} />
          <NewsInfo>
            <NewsTitle>{item.title}</NewsTitle>
            <NewsContent>{item.summary}</NewsContent>
            <NewsPress>{item.press}</NewsPress>
          </NewsInfo>
        </NewsDiv>
      ))}
    </NewsListDiv>
  );
}

export default TrendingNews;
