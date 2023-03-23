import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as Logo } from "../assets/peaK.svg";
import Search from "./Search";

const MenuBackground = styled.div`
  flex: 1 0 250px;
  height: 100%;
  border-radius: 30px;
  padding: 40px 0;
  background-color: rgba(255, 255, 255, 0.5);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const MenuSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    margin-bottom: 25px;
  }
`;

const MenuTab = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Menu = styled.div`
  width: 100%;
  color: var(--gray400-color);

  
  > * {
    display: flex;
    align-items: center;
    padding: 10px 0 10px 40px;

    &.active {
      color: var(--purple500-color);
      padding: 10px 0 10px 36px;
      border-left: 4px solid var(--purple400-color);
      font-weight: 600;
    }
  }
`;

function MenuBar() {
  return (
    <MenuBackground>
      <MenuSection>
        <Logo />
        <Search width="220px" />
        <MenuTab>
          <Menu><NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>홈</NavLink></Menu>
          <Menu><NavLink to="/newjeans" className={({ isActive }) => (isActive ? "active" : "")}>관심 아이돌</NavLink></Menu>
          <Menu><NavLink to="/ranking" className={({ isActive }) => (isActive ? "active" : "")}>랭킹/차트</NavLink></Menu>
          <Menu><NavLink to="/news" className={({ isActive }) => (isActive ? "active" : "")}>트렌딩</NavLink></Menu>
          <Menu><NavLink to="/mypage/hanbin" className={({ isActive }) => (isActive ? "active" : "")}>마이페이지</NavLink></Menu>
        </MenuTab>
      </MenuSection>
      <MenuSection>
        <MenuTab>
          <Menu><NavLink to="data">데이터 산출 근거</NavLink></Menu>
          <Menu><Link to="/">로그아웃</Link></Menu>
        </MenuTab>
      </MenuSection>
    </MenuBackground>
  );
}

export default MenuBar;
