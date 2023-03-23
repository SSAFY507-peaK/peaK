import { Link, NavLink } from "react-router-dom";

import { ReactComponent as Logo } from "../assets/peaK.svg";
import React from "react";
import Search from "./Search";
import styled from "styled-components";

const MenuBackground = styled.div`
  width: 280px;
  height: 100%;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
`;

const MenuTab = styled.div`
  & > * {
    width: 100%;
  }
`;

function MenuBar() {
  return (
    <MenuBackground>
      <div>
        <Logo />
        <Search />
        <MenuTab>
          <NavLink to="/">홈</NavLink>
          <NavLink to="/newjeans">관심 아이돌</NavLink>
          <NavLink to="/ranking">랭킹/차트</NavLink>
          <NavLink to="/news">트렌딩</NavLink>
          <NavLink to="/mypage/hanbin">마이페이지</NavLink>
        </MenuTab>
      </div>
      <div>
        <MenuTab>
          <NavLink to="/">데이터 산출 근거</NavLink>
          <Link to="/">로그아웃</Link>
        </MenuTab>
      </div>
    </MenuBackground>
  );
}

export default MenuBar;
