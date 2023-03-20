import React from "react";
import { NavLink, Outlet } from "react-router-dom";

/** 랭킹과 차트 이동을 위한 탭 페이지입니다. 언제든 삭제될 위험이 있음. */
function RankingLayout() {
  return (
    <div>
      <h3>
        <NavLink to="/ranking" end>
          랭킹
        </NavLink>
      </h3>
      <h3>
        <NavLink to="/ranking/chart">차트</NavLink>
      </h3>

      <Outlet />
    </div>
  );
}

export default RankingLayout;
