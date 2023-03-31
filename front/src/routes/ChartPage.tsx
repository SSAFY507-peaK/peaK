import IdolChart from "../components/RankingPage/IdolChart";
import React from "react";
import styled from "styled-components";

const ChartDiv = styled.div`
  width: 50vw;
  height: 40vw;
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
