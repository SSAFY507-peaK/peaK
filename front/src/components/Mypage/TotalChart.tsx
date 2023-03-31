import TitleComponent from "../idolpage/TitleComponent";
import styled from "styled-components";

interface Props {
  userName: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.5;
  width: 100%;
`;

const ChartFrame = styled.div`

`;

function TotalChart({userName}:Props) {
  return (
    <Wrapper>
      <TitleComponent blacktxt="전체" purpletxt="관심도" />
      <ChartFrame>
        
      </ChartFrame>
    </Wrapper>
  )
}

export default TotalChart;
