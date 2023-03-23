import { Outlet } from "react-router";
import React from "react";
import styled from "styled-components";

const WrapperDiv = styled.div`
  width: 100%;
  margin: 30px;
  overflow-y: auto;
`;

function Wrapper(): any {
  return (
    <WrapperDiv>
      <Outlet />
    </WrapperDiv>
  );
}

export default Wrapper;
