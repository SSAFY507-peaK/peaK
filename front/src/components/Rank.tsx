import IdolProfile from "./IdolProfile";
import styled from "styled-components";

interface RankingNumType {
  rank: string;
}

/** 순위 숫자 (색을 다르게 부여) */
const RankingNum = styled.div<RankingNumType>`
  font-size: ${props => (props.rank in ["1", "2", "3"] ? "20px" : "14px")};
  color: ${props =>
    props.rank === "1"
      ? "#FFB800"
      : props.rank === "2"
      ? "#B7B7B7"
      : props.rank === "3"
      ? "#A55A23"
      : "#000000"};
`;

function Rank(props: any): any {
  let IdolRank: any = 0;
  if (props.rank in ["1", "2", "3"]) {
    IdolRank = (
      <IdolProfile width="240px" height="200px" shape="rect" url={props.url}></IdolProfile>
    );
  } else {
    IdolRank = (
      <IdolProfile width="160px" height="160px" shape="round" url={props.url}></IdolProfile>
    );
  }
  return (
    <div>
      <RankingNum rank={props.rank}>{props.rank}</RankingNum>
      <div>{IdolRank}</div>
      <div>{props.name}</div>
    </div>
  );
}

export default Rank;
