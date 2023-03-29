import React from "react";
import styled from "styled-components";

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

interface NewsProfileType {
  url: string;
}

const NewsProfile = styled.div<NewsProfileType>`
  width: 25%;
  height: 8vw;
  background-size: cover;
  background-image: url(${props => props.url});
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

function TrendingNews() {
  const items = [
    {
      thumnail_link:
        "https://ssl.pstatic.net/mimgnews/image/609/2023/03/29/202303291124156710_1_20230329162502877.jpg?type=w540",
      title: "적어도 기자가, 마감시간을 당겨달라 해선 안 된다",
      press: "언론 1",
      summary:
        "조선일보 신임 편집국장으로 선우정 논설위원이 지난 17일 임명됐다. 조선일보 편집국장직의 의미는 남다른 데가 있다. 국내 최대부수의 신문이고 언론계",
      link: "https://newsis.com/view/?id=NISX20230329_0002244799&cID=10601&pID=10600",
    },
    {
      thumnail_link: "https://ssl.pstatic.net/mimgnews/image/origin/311/2023/03/29/1574653.jpg",
      title: "자꾸 내 자리 넘봐…장도연, 배두나→유지태에 위기감 (지선씨네마인드2)[종합]",
      press: "윤희훈 기자",
      summary:
        "지선씨네마인드2' 장도연이 빵빵한 게스트에 위기감을 고백했다. 29일 오후 서울 양천구 SBS 사옥에서 열린 SBS 프로그램 '지선씨네마인드 시즌2' 기자 간담회가 열렸다. 이 자리에는 범죄 심리학자 박지선 교수와",
      link: "https://newsis.com/view/?id=NISX20230329_0002244799&cID=10601&pID=10600",
    },
    {
      thumnail_link: "https://ssl.pstatic.net/mimgnews/image/origin/112/2023/03/29/3622501.jpg",
      title: "[할리웃POP]'아이언맨' 로버트 다우니 주니어가 씹던 껌, 7100만원에 판매 중",
      press: "뿡",
      summary:
        "로버트 다우니 주니어가 씹던 껌이 5만 5,000달러(한화 약 7100만원)에 판매 중이라 화제다. 29일(한국시간) 영국 데일리 메일 등 외신에 따르면 로버트 다우니 주니어(57)가 씹었던 껌 한 조각이 이베이에서",
      link: "https://newsis.com/view/?id=NISX20230329_0002244799&cID=10601&pID=10600",
    },
    {
      thumnail_link:
        "https://imgnews.pstatic.net/image/366/2023/03/29/0000888936_001_20230329143706363.JPG?type=w800",
      title: "정부, 여행·휴가비 600억 쏜다… “19만명에 휴가비 10만원, 100만명에 숙박비 3만원",
      press: "윤희훈 기자",
      summary:
        "비상경제민생회의서 내수 활성화 대책 발표 릴레이 메가 이벤트 개최 유통업계 할인 행사 확대 정부가 200억원의 재정을 투입해 중소·중견기업 근로자와 소상공인 등 최대 19만명에게 10만원의 휴가비를 지급한다. 또 관",
      link: "https://newsis.com/view/?id=NISX20230329_0002244799&cID=10601&pID=10600",
    },
    {
      thumnail_link: "https://ssl.pstatic.net/mimgnews/image/origin/112/2023/03/29/3622501.jpg",
      title: "[할리웃POP]'아이언맨' 로버트 다우니 주니어가 씹던 껌, 7100만원에 판매 중",
      press: "뿡",
      summary:
        "로버트 다우니 주니어가 씹던 껌이 5만 5,000달러(한화 약 7100만원)에 판매 중이라 화제다. 29일(한국시간) 영국 데일리 메일 등 외신에 따르면 로버트 다우니 주니어(57)가 씹었던 껌 한 조각이 이베이에서",
      link: "https://newsis.com/view/?id=NISX20230329_0002244799&cID=10601&pID=10600",
    },
  ];
  return (
    <NewsListDiv>
      {items.map(item => (
        <NewsDiv onClick={() => window.open(item.link)}>
          <NewsProfile url={item.thumnail_link} />
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
