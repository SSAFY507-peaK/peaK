import styled from "styled-components"
import React from 'react';
import Content from "./Content";

const TitleContentContainer = styled.div<TitleContentProps>`
  width: 100%;
  height: 100%;
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
}
function TitleContent({title, gridColumn, noContentBackground, data}: TitleContentProps) {
  return (
    <TitleContentContainer gridColumn={gridColumn}>
      {title}
      {noContentBackground ? <TransparentContent>{data}</TransparentContent> : <Content>{data}</Content> }
    </TitleContentContainer>
  );
}

export default TitleContent;