import TitleComponent from "../idolpage/TitleComponent";
import styled from "styled-components";
import MyInterestChart from "./MyInterestChart";

interface Props {
  userName: string;
  idolName: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.2;
  width: 100%;

`;

const ChartFrame = styled.div`
  background-color: white;
  border-radius: 20px;
`;

const ScoreFrame = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function MyInterest({userName, idolName}:Props) {
  return (
    <Wrapper>
      <TitleComponent id="1" blacktxt="관심도" purpletxt={idolName} />
      <ChartFrame>
        <MyInterestChart />
      </ChartFrame>
      <ScoreFrame>

      </ScoreFrame>
    </Wrapper>
  )
}
