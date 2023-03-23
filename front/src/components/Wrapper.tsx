import { Outlet } from "react-router";
import React from "react";
import styled from "styled-components";

const WrapperDiv = styled.div`
  margin: 30px;
  width: 100%;
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
