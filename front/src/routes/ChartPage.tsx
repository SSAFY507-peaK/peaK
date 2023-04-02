import RankChart from "../components/rankingpage/RankChart";
import styled from "styled-components";

const ChartDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40vw;
  height: 35vw;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 0px 3px rgba(151, 151, 151, 0.25);
`;

function ChartPage() {
  return (
    <div>
      <ChartDiv>
        <RankChart />
      </ChartDiv>
    </div>
  );
}

export default ChartPage;
