import { Outlet } from "react-router";
import React from "react";
import styled from "styled-components";

const WrapperDiv = styled.div`
  width: 100%;
  margin: 25px 13px 25px 25px;
  padding-right: 25px;
  overflow-y: auto;
  
  // 스크롤바 관련 설정
  &::-webkit-scrollbar {
    width: 7px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.8);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: var(--gray700-color);
  }
`;

function Wrapper(): any {
  return (
    <WrapperDiv>
      <Outlet />
    </WrapperDiv>
  );
}

export default Wrapper;
