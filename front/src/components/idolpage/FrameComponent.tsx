import styled from "styled-components";

interface FrameType {
  width:string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Frame = styled.div<FrameType>`
  display: flex;
  flex-direction: column;
  width: ${props => props.width};
`;


function FrameCommponent({leftitem,rightitem}:any) {
  return(
    <Wrapper>
      <Frame width="40%">{leftitem}</Frame>
      <Frame width="10%"></Frame>
      <Frame width="45%">{rightitem}</Frame>
    </Wrapper>
  )
}

export default FrameCommponent;