import Content from "../Content";
import MyInterestChart from "./MyInterestChart";
import ScoreComponent from "./ScoreComponent"
import TitleComponent from "../IdolPage/TitleComponent";
import styled from "styled-components";

interface Props {
  userName: string;
  idolName: string;
  idolScoreData: number[];
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.23;
  margin-right: 25px;
`;

const ScoreFrame = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-end;
`;

function MyInterest({userName, idolName, idolScoreData}:Props) {

  const myScore:number = idolScoreData[0]
  const averageScore:number = idolScoreData[1]
  
  return (
    <Wrapper>
      <TitleComponent id="1" blacktxt="관심도" purpletxt={idolName} />
      <Content>
        <MyInterestChart myScore={myScore} />
        <ScoreFrame>
          <ScoreComponent title="나의 점수" score= {`${myScore}점`} size="1.4rem" fsize="0.9rem" color={`var(--purple400-color)`} />
          <ScoreComponent title="평균점수" score= {`${averageScore}점`} size="1.2rem" fsize="0.8rem" opacity="0.7" color={`var(--purple700-color)`} />
        </ScoreFrame>
      </Content>
    </Wrapper>
  )
}

export default MyInterest;