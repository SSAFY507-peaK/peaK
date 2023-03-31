import IdolChart from "../components/RankingPage/IdolChart";
import React from "react";
import styled from "styled-components";

const ChartDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 40vw;
  background-color: var(--white800-color);
  border-radius: 15px;
  box-shadow: 0px 0px 3px rgba(151, 151, 151, 0.25);
`;

function ChartPage() {
  return (
    <div>
      <ChartDiv>
        <IdolChart />
      </ChartDiv>
    </div>
  );
}

export default ChartPage;
