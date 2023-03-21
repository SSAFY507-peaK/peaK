import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
`;


function FrameCommponent({leftitem,rightitem}:any) {
  return(
    <Wrapper>
      <Frame>{leftitem}</Frame>
      <Frame>{rightitem}</Frame>
    </Wrapper>
  )
}

export default FrameCommponent;