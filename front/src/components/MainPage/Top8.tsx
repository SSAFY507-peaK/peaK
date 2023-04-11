import IdolRank from "./IdolRank";
import styled from "styled-components";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const RankDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const RankTopDiv = styled.div`
  width: 100%;
  flex: 0.6;
  display: flex;
  position: relative;
  justify-content: space-around;
`;

const RankBottomDiv = styled.div`
  width: 100%;
  flex: 0.4;
  display: flex;
  position: relative;
  justify-content: space-around;
`;

function Top8(props: any) {
  const items = props;
  const itemsTop = items.slice(0, 3);
  const itemsBottom = items.slice(3, 8);

  return (
    <RankDiv>
      <RankTopDiv>
        {itemsTop.map((item: any) => (
          <IdolRank
            name={item.idol}
            rank={item.rank}
            url={`${BASE_URL}/img/${encodeURIComponent(`${item.idol}`)}.webp`}
          />
        ))}
      </RankTopDiv>
      <RankBottomDiv>
        {itemsBottom.map((item: any) => (
          <IdolRank
            name={item.idol}
            rank={item.rank}
            url={`${BASE_URL}/img/${encodeURIComponent(`${item.idol}`)}.webp`}
          />
        ))}
      </RankBottomDiv>
    </RankDiv>
  );
}

export default Top8;
