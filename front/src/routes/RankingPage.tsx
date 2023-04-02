import { ReactComponent as Down } from "../assets/arrow-down.svg";
import { ReactComponent as Stable } from "../assets/stable.svg";
import { ReactComponent as Up } from "../assets/arrow-up.svg";
import styled from "styled-components";

type IdolImgDivType = {
  url: string;
};

type RankDiffNumType = {
  sign: "up" | "stable" | "down";
};

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
  height: 14vh;
  align-items: center;
  padding: 30px 30px;
  font-size: 1.8rem;
  border-bottom: 1px solid #d9d9d9;
  font-weight: bold;
  /* border-radius: 10px; */
  transition: all 100ms ease-in-out;
  &:hover {
    transform: scale(1.01, 1.01);
    cursor: pointer;
    background-color: #f5edf8;
  }
`;

const IdolImgDiv = styled.div<IdolImgDivType>`
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center;
  width: 11vh;
  height: 11vh;
  border-radius: 5px;
  margin: 0vh 10vh 0vh 5vh;
`;

const IdolNameDiv = styled.div`
  font-size: 1rem;
`;

const RankNumDiv = styled.div`
  width: 5%;
  font-size: 1.4rem;
`;

const RankDifferDiv = styled.div`
  display: flex;
  align-items: center;
  width: 4%;
  justify-content: center;
`;

const ScoreDiv = styled.div`
  font-size: 0.7rem;
  display: flex;
  justify-content: flex-end;
  width: 65%;
  /* justify-content: space-around; */
  color: #b3b3b3;
`;

const RankDiffNum = styled.div<RankDiffNumType>`
  color: ${props => (props.sign === "up" ? "red" : props.sign === "down" ? "blue" : null)};
  font-size: 1.1rem;
`;

const RankDiffer = (differ: any) => {
  if (differ > 0) {
    return (
      <RankDifferDiv>
        <Up width="3.7vh" height="3.7vh" fill="red" />
        <RankDiffNum sign="up">{Math.abs(differ)}</RankDiffNum>
      </RankDifferDiv>
    );
  } else if (differ < 0) {
    return (
      <RankDifferDiv>
        <Down width="3.7vh" height="3.7vh" fill="blue" />
        <RankDiffNum sign="down">{Math.abs(differ)}</RankDiffNum>
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

const RankDiv = (props: any) => {
  return (
    <IdolRankDiv>
      <RankNumDiv>{props.rank}</RankNumDiv>
      {RankDiffer(props.differ)}
      <IdolImgDiv url={props.url} />
      <IdolNameDiv>{props.name}</IdolNameDiv>
      <ScoreDiv>
        <div>{props.score}</div>
      </ScoreDiv>
    </IdolRankDiv>
  );
};

function RankingPage() {
  const items = [
    {
      rank: 1,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 0,
      score: 36464,
    },
    {
      rank: 2,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 1,
      score: 16464,
    },
    {
      rank: 3,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: -1,
      score: 13335,
    },
    {
      rank: 4,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 6,
      score: 6236,
    },
    {
      rank: 5,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 0,
      score: 4235,
    },
    {
      rank: 6,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 3,
      score: 2523,
    },
    {
      rank: 1,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 0,
      score: 36464,
    },
    {
      rank: 2,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 1,
      score: 16464,
    },
    {
      rank: 3,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: -1,
      score: 13335,
    },
    {
      rank: 4,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 6,
      score: 6236,
    },
    {
      rank: 5,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 0,
      score: 4235,
    },
    {
      rank: 6,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 3,
      score: 2523,
    },
    {
      rank: 1,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 0,
      score: 36464,
    },
    {
      rank: 2,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 1,
      score: 16464,
    },
    {
      rank: 3,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: -1,
      score: 13335,
    },
    {
      rank: 4,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 6,
      score: 6236,
    },
    {
      rank: 5,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 0,
      score: 4235,
    },
    {
      rank: 6,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 3,
      score: 2523,
    },
    {
      rank: 1,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 0,
      score: 36464,
    },
    {
      rank: 2,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 1,
      score: 16464,
    },
    {
      rank: 3,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: -1,
      score: 13335,
    },
    {
      rank: 4,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 6,
      score: 6236,
    },
    {
      rank: 5,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 0,
      score: 4235,
    },
    {
      rank: 6,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 3,
      score: 2523,
    },
    {
      rank: 1,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 0,
      score: 36464,
    },
    {
      rank: 2,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 1,
      score: 16464,
    },
    {
      rank: 3,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: -1,
      score: 13335,
    },
    {
      rank: 4,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 6,
      score: 6236,
    },
    {
      rank: 5,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 0,
      score: 4235,
    },
    {
      rank: 6,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 3,
      score: 2523,
    },
    {
      rank: 1,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 0,
      score: 36464,
    },
    {
      rank: 2,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 1,
      score: 16464,
    },
    {
      rank: 3,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: -1,
      score: 13335,
    },
    {
      rank: 4,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 6,
      score: 6236,
    },
    {
      rank: 5,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 0,
      score: 4235,
    },
    {
      rank: 6,
      name: "BTS",
      url: "https://i.ytimg.com/vi/v_5JkyrTzEo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCSN0w6URSE6bwXzWcvnfNoRLcYvw",
      differ: 3,
      score: 2523,
    },
  ];
  return <AllRankDiv>{items.map(item => RankDiv(item))}</AllRankDiv>;
}

export default RankingPage;
