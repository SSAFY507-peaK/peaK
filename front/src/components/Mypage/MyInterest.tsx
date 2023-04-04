import MyInterestChart from "./MyInterestChart";
import ScoreComponent from "./ScoreComponent"
import TitleComponent from "../idolpage/TitleComponent";
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

const Frame = styled.div`
  background-color: white;
  border-radius: 20px;
  height: 100%;
  width: 100%;
`;

const ScoreFrame = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

function MyInterest({userName, idolName, idolScoreData}:Props) {

  const myScore:number = idolScoreData[0]
  const averageScore:number = idolScoreData[1]
  
  return (
    <Wrapper>
      <TitleComponent id="1" blacktxt="관심도" purpletxt={idolName} />
      <Frame>
        <MyInterestChart myScore={myScore} />
        <ScoreFrame>
          <ScoreComponent pd="0px 0px 20px 40px" title="나의 점수" score= {`${myScore}점`} size="1.4rem" fsize="0.9rem" color={`var(--purple400-color)`} />
          <ScoreComponent pd="5px 40px 20px 0px" title="평균점수" score= {`${averageScore}점`} size="1.2rem" fsize="0.8rem" opacity="0.7" color={`var(--purple700-color)`} />
        </ScoreFrame>
      </Frame>
    </Wrapper>
  )
}

export default MyInterest;