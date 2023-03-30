import styled from "styled-components";

const AllRankDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  height: 100%;
  overflow-y: auto;

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
  width: 100%;
  height: 13vh;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
`;

const RankDiv = (props: any) => {
  return <IdolRankDiv>{props.rank}</IdolRankDiv>;
};

function RankingPage() {
  const items = [{ rank: 1, name: "BTS" }];
  return <AllRankDiv>{items.map((item, idx) => RankDiv(item))}</AllRankDiv>;
}

export default RankingPage;
