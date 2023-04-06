import styled from "styled-components"
import React from 'react';
import Content from "./Content";

const TitleContentContainer = styled.div<TitleContentProps>`
  width: 100%;
  height: ${props => props.height || "100%"}
  display: flex;
  flex-direction: column;
  grid-column: ${props => props.gridColumn? props.gridColumn :"1"};
`
const TransparentContent = styled(Content)`
  background-color: transparent;
  box-shadow: none;
`
type TitleContentProps = {
  title?: JSX.Element;
  gridColumn?: string;
  noContentBackground?: boolean;
  data?: any;
  height?: string;
}
function TitleContent({title, gridColumn, noContentBackground, data, height}: TitleContentProps) {
  return (
    <TitleContentContainer style={{height: height}} gridColumn={gridColumn}>
      {title}
      {noContentBackground ? <TransparentContent>{data}</TransparentContent> : <Content>{data}</Content> }
    </TitleContentContainer>
  );
}

export default TitleContent;