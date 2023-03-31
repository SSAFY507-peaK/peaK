import TitleComponent from "../idolpage/TitleComponent";
import styled from "styled-components";
import MyInterestChart from "./MyInterestChart";
import ScorerComponent from "./ScorerComponent";

interface Props {
  userName: string;
  idolName: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.2;
  width: 100%;
  margin-right: 25px;
`;

const Frame = styled.div`
  background-color: white;
  border-radius: 20px;
`;

const ScoreFrame = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default function MyInterest({userName, idolName}:Props) {
  const myScore:number = 67
  const averageScore:number = 57
  return (
    <Wrapper>
      <TitleComponent id="1" blacktxt="관심도" purpletxt={idolName} />
      <Frame>
        <MyInterestChart />
        <ScoreFrame>
          <ScorerComponent pd="0px 0px 30px 40px" title="나의 점수" score= {`${myScore}점`} size="1.4rem" fsize="0.9rem" color={`var(--purple400-color)`} />
          <ScorerComponent pd="5px 40px 20px 0px" title="평균점수" score= {`${averageScore}점`} size="1.2rem" fsize="0.8rem" opacity="0.7" color={`var(--purple700-color)`} />
        </ScoreFrame>
      </Frame>
    </Wrapper>
  )
}
