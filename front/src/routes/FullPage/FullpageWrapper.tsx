import styled from "styled-components";

const FullpageWrapper = styled.div<{ backgroundColor: string}>`
  height: 100%;
  //height: 100vh;
  width: 100%;
  background-color: ${props => props.backgroundColor};
  display: flex;
`
export default FullpageWrapper;