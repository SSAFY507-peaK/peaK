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

const NewsListGrid = styled.div`
  display: grid;
  width: 100%;
  margin-bottom: 40px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  row-gap: 2px;
  column-gap: 40px;
`;

const NewsListDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const NewsGridLarge = styled.div`
  grid-row-start: 1;
  grid-row-end: 3;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2vh;
  transition: all 100ms ease-in-out;
  &:hover {
    transform: scale(1.01, 1.01);
    cursor: pointer;
  }
`;

const NewsGridSmall = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2vh;
  transition: all 100ms ease-in-out;
  &:hover {
    transform: scale(1.01, 1.01);
    cursor: pointer;
  }
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

const NewsMainProfile = styled.div<NewsProfileType>`
  background-image: url(${props => props.url});
  width: 98%;
  height: 15vw;
  background-size: cover;
  background-position: center 25%;
  border-radius: 5px;
`;

const NewsSubProfile = styled.div<NewsProfileType>`
  background-image: url(${props => props.url});
  width: 65%;
  height: 15vh;
  background-size: cover;
  background-position: center 25%;
  border-radius: 5px;
`;

const NewsProfile = styled.div<NewsProfileType>`
  background-image: url(${props => props.url});
  width: 25%;
  height: 8vw;
  background-size: cover;
  background-position: center 25%;
  border-radius: 5px;
`;

const NewsInfo = styled.div`
  margin: 1vh 2vh;
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NewsMainTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  padding-top: 1.5vh;
  padding-bottom: 0vh;
`;

const NewsTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const NewsContent = styled.div`
  font-size: 15px;
`;

const NewsPress = styled.div`
  font-size: 13px;
  color: #848484f1;
`;

function TrendingNews({ data }: Props) {
  const items = data;
  return (
    <div>
      <NewsListGrid>
        {items.map((item: NewsType, idx) =>
          idx >= 3 ? null : idx === 0 ? (
            <NewsGridLarge onClick={() => window.open(item.link)}>
              <NewsMainProfile url={item.thumbnailLink} />
              <NewsMainTitle>
                {item.title.length <= 20 ? item.title : item.title.substring(0, 20) + "..."}
              </NewsMainTitle>
            </NewsGridLarge>
          ) : (
            <NewsGridSmall onClick={() => window.open(item.link)}>
              <NewsSubProfile url={item.thumbnailLink} />
              <NewsInfo>
                <NewsTitle>
                  {item.title.length <= 15 ? item.title : item.title.substring(0, 15) + "..."}
                </NewsTitle>
                <NewsContent>
                  {item.summary.length <= 30 ? item.summary : item.summary.substring(0, 30) + "..."}
                </NewsContent>
                <NewsPress>{item.press}</NewsPress>
              </NewsInfo>
            </NewsGridSmall>
          ),
        )}
      </NewsListGrid>
      <NewsListDiv>
        {items.map((item: NewsType, idx) =>
          idx < 3 ? null : (
            <NewsDiv onClick={() => window.open(item.link)}>
              <NewsProfile url={item.thumbnailLink} />
              <NewsInfo>
                <NewsTitle>{item.title}</NewsTitle>
                <NewsContent>{item.summary}</NewsContent>
                <NewsPress>{item.press}</NewsPress>
              </NewsInfo>
            </NewsDiv>
          ),
        )}
      </NewsListDiv>
    </div>
  );
}

export default TrendingNews;
