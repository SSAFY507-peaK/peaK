import ScoreComponent from "./ScoreComponent";
import styled from "styled-components";

interface Props {
  score: string;
  title: string;
  data: any;
  children?: any;
  icon: any;
  mr?: string;
}

interface WrapperType {
  mr?: string;
}

const Wrapper = styled.div<WrapperType>`
  display: flex;
  flex-direction: column;
  flex: 0.35;
  box-shadow: 0 0 5px -2px rgba(151, 151, 151, 0.25);
  /* width: 100%;
  height: 100%; */
  margin-right: ${ props => props.mr || "25px"};
  background-color: white;
  border-radius: 20px;
  padding: 25px 25px 0 25px;
`;

const TitleFrame = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

function ChartFrameComponent({score, title, data, icon, mr, children}:Props) {
  return (
    <Wrapper mr={mr}>
      <TitleFrame>
        <ScoreComponent opacity="0.8" size="1.4rem" fsize="0.9rem" score={score} title={title} />
        {icon}
      </TitleFrame>
      {data}
    </Wrapper>  
  )
}

export default ChartFrameComponent;