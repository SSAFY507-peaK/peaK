import RankingDiv from "./RankingDiv";
import styled from "styled-components";

const ComponentDiv = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  padding: 10px 30px 30px 30px;
  flex: 0.7;
  margin-right: 15px;
  margin-bottom: 7.5px;
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px;
`;

const PurpleH2 = styled.h2`
  color: var(--purple400-color);
  margin-right: 5px;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

function RankingTop8() {
  return (
    <ComponentDiv>
      <TitleDiv>
        <PurpleH2>랭킹 </PurpleH2>
        <h2> Top 8</h2>
      </TitleDiv>
      <ContentDiv>
        <div>
          <RankingDiv shape="rect"></RankingDiv>
          <RankingDiv shape="round"></RankingDiv>
        </div>
      </ContentDiv>
    </ComponentDiv>
  );
}

export default RankingTop8;
