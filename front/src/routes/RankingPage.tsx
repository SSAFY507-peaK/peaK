import { ReactComponent as Down } from "../assets/arrow-down.svg";
import { RankListType } from "../_utils/Types";
import { ReactComponent as Stable } from "../assets/stable.svg";
import { ReactComponent as Up } from "../assets/arrow-up.svg";
import axios from "axios";
import styled from "styled-components";
import { useLoaderData } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;

type IdolImgDivType = {
  url: string;
};

type RankDiffNumType = {
  sign: "up" | "stable" | "down";
};

type RankDivType = {
  idol: string;
  rank: number;
  diff: number;
  score: number;
};

export async function loader() {
  let RankList = null;
  await axios
    .get(`${BASE_URL}peak/`)
    .then(response => {
      RankList = response.data.ranksByHour;
    })
    .catch(error => console.log(error));
  return RankList;
}

const AllRankDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  height: 100%;
  overflow-y: auto;
  align-items: center;
  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.8);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: var(--gray700-color);
  }
`;

const IdolRankDiv = styled.div`
  display: flex;
  width: 90%;
  height: 15vh;
  align-items: center;
  padding: 30px 30px;
  font-size: 1.8rem;
  border-bottom: 1px solid #d9d9d9;
  font-weight: bold;
  transition: all 100ms ease-in-out;
  &:hover {
    transform: scale(1.005, 1.005);
    cursor: pointer;
    background-color: #f5edf8;
  }
`;

const IdolImgDiv = styled.div<IdolImgDivType>`
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center;
  width: 10%;
  height: 12vh;
  border-radius: 5px;
  margin: 0vh 10vh 0vh 5vh;
`;

const IdolNameDiv = styled.div`
  font-size: 1rem;
  width: 15%;
`;

const RankNumDiv = styled.div`
  width: 5%;
  font-size: 1.4rem;
  display: flex;
  justify-content: space-around;
`;

const RankDifferDiv = styled.div`
  display: flex;
  align-items: center;
  width: 4%;
  justify-content: center;
`;

const ScoreDiv = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: flex-end;
  width: 55%;
  color: #b3b3b3;
  padding-right: 10vh;
`;

const RankDiffNum = styled.div<RankDiffNumType>`
  width: 5%;
  color: ${props => (props.sign === "up" ? "red" : props.sign === "down" ? "blue" : null)};
  font-size: 15px;
`;

const RankDiffer = (diff: number) => {
  if (diff > 0) {
    return (
      <RankDifferDiv>
        <Up width="3.7vh" height="3.7vh" fill="red" />
        <RankDiffNum sign="up">{Math.abs(diff)}</RankDiffNum>
      </RankDifferDiv>
    );
  } else if (diff < 0) {
    return (
      <RankDifferDiv>
        <Down width="3.7vh" height="3.7vh" fill="blue" />
        <RankDiffNum sign="down">{Math.abs(diff)}</RankDiffNum>
      </RankDifferDiv>
    );
  } else {
    return (
      <RankDifferDiv>
        <Stable width="3.7vh" height="3.7vh" />
      </RankDifferDiv>
    );
  }
};

/** 아이돌 1팀의 순위, 순위변동, 사진, 점수, 이름 */
const RankDiv = (props: RankDivType) => {
  return (
    <IdolRankDiv>
      <RankNumDiv>{props.rank}</RankNumDiv>
      {RankDiffer(props.diff)}
      <IdolImgDiv url={`https://j8a507.p.ssafy.io/img/${props.idol}.webp`} />
      <IdolNameDiv>{props.idol}</IdolNameDiv>
      <ScoreDiv>
        <div>{props.score}</div>
      </ScoreDiv>
    </IdolRankDiv>
  );
};

/** 모든 아이돌의 순위, 순위변동, 사진, 점수, 이름 */
function RankingPage() {
  const RankList = useLoaderData() as RankListType[];
  return <AllRankDiv>{RankList.map((item: RankListType) => RankDiv(item))}</AllRankDiv>;
}

export default RankingPage;
