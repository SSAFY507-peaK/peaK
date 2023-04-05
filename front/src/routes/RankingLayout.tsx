import { NavLink, Outlet } from "react-router-dom";

import styled from "styled-components";

const TabDiv = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 15px;
  & a {
    display: block;
    margin-right: 10px;
    &.active::after {
      content: "";
      display: block;
      width: 100%;
      border-top: 3px solid var(--purple500-color);
    }
  }
`;

function RankingLayout() {
  return (
    <>
      <TabDiv>
        <NavLink
          to="/ranking"
          end
          style={({ isActive }) => ({ color: isActive ? "#9244C0" : "#383838" })}
        >
          <h3>랭킹</h3>
        </NavLink>
        <NavLink
          to="/ranking/chart"
          style={({ isActive }) => ({ color: isActive ? " #9244C0" : "#383838" })}
        >
          <h3>차트</h3>
        </NavLink>
      </TabDiv>

      <Outlet />
    </>
  );
}

export default RankingLayout;
