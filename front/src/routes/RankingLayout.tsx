import { NavLink, Outlet } from "react-router-dom";

import React from "react";
import styled from "styled-components";

const TabDiv = styled.div`
  display: flex;
  width: 7%;
  justify-content: space-around;
`;

function RankingLayout() {
  return (
    <div>
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
    </div>
  );
}

export default RankingLayout;
