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
  margin-bottom: 1vh;
  padding: 5px;
  border-radius: 5px;
  transition: all 100ms ease-in-out;
  &:hover {
    transform: scale(1.01, 1.01);
    cursor: pointer;
    background-color: var(--purple900-color);
  }
`;

const NewsGridSmall = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1vh;
  padding: 5px;
  border-radius: 5px;
  transition: all 100ms ease-in-out;
  &:hover {
    transform: scale(1.01, 1.01);
    cursor: pointer;
    background-color: var(--purple900-color);
  }
`;

const NewsDiv = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1vh;
  padding: 10px;
  border-radius: 5px;
  transition: all 100ms ease-in-out;
  &:hover {
    transform: scale(1.02, 1.02);
    cursor: pointer;
    background-color: var(--purple900-color);
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
  padding-bottom: 0;
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
        {/* 상위 3개의 뉴스는 최상단에 크게 표시 */}
        {items.map((item: NewsType, idx) =>
          idx >= 3 ? null : idx === 0 ? (
            // 클릭 시 새 창으로 뉴스 기사 바로가기
            <NewsGridLarge onClick={() => window.open(item.link)}>
              <NewsMainProfile url={item.thumbnailLink} />
              <NewsMainTitle>
                {/* 제목이 20자 초과라면 20자까지 표시 후 ... 처리 */}
                {item.title.length <= 16 ? item.title : item.title.substring(0, 16) + "..."}
              </NewsMainTitle>
            </NewsGridLarge>
          ) : (
            // 클릭 시 새 창으로 뉴스 기사 바로가기
            <NewsGridSmall onClick={() => window.open(item.link)}>
              <NewsSubProfile url={item.thumbnailLink} />
              <NewsInfo>
                <NewsTitle>
                  {/* 제목이 15자 초과라면 15자까지 표시 후 ... 처리 */}
                  {item.title.length <= 10 ? item.title : item.title.substring(0, 10) + "..."}
                </NewsTitle>
                <NewsContent>
                  {/* 내용이 30자 초과라면 30자까지 표시 후 ... 처리 */}
                  {item.summary.length <= 20 ? item.summary : item.summary.substring(0, 20) + "..."}
                </NewsContent>
                <NewsPress>{item.press}</NewsPress>
              </NewsInfo>
            </NewsGridSmall>
          ),
        )}
      </NewsListGrid>
      <NewsListDiv>
        {/* 상위 3개의 뉴스 제외하고 나머지 뉴스는 일렬로 나열 */}
        {items.map((item: NewsType, idx) =>
          idx < 3 ? null : (
            // 클릭 시 새 창으로 뉴스 기사 바로가기
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
