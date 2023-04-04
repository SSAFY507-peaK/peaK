import React from 'react';
import styled from "styled-components";

const DotContainer = styled.div`
  position: fixed;
  top: 50%;
  right: 50px;
  transform: translate(0, -50%);
  z-index: 507;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div:nth-child(4) {
    margin-bottom: 0;
  }
`
const Dot = styled.div`
  height: 10px;
  width: 10px;
  background-color: var(--gray700-color);
  border-radius: 50%;
  margin-bottom: 10px;
  &.active {
    height: 15px;
    width: 15px;
    background-color: var(--gray500-color);
    ::after {
      content: "";
      display: block;
      height: 21px;
      width: 21px;
      background: transparent;
      border-radius: 50%;
      transform: translate(-13.5%, -13.5%);
      border: 1px dashed var(--gray500-color);
    }
  }
`

function DotComponent({scrollIdx}: {scrollIdx: number}) {
  return (
    <DotContainer>
      <Dot className={scrollIdx === 1 ? 'active' : ""} />
      <Dot className={scrollIdx === 2 ? 'active' : ""} />
      <Dot className={scrollIdx === 3 ? 'active' : ""} />
      <Dot className={scrollIdx === 4 ? 'active' : ""} />
    </DotContainer>
  );
}

export default DotComponent;