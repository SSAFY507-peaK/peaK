import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonIcon from '@mui/icons-material/Person';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';

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
    &:last-child {
      margin-bottom: 0;
    }
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

const style = {marginRight: "7px", fontSize: "medium"}

function MenuBar() {
  return (
    <MenuBackground>
      <MenuSection>
        <Logo />
        <Search width="220px" />
        <MenuTab>
          <Menu><NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}><HomeIcon style={style}/>홈</NavLink></Menu>
          <Menu><NavLink to="/newjeans" className={({ isActive }) => (isActive ? "active" : "")}><FavoriteIcon style={style}/>관심 아이돌</NavLink></Menu>
          <Menu><NavLink to="/ranking" className={({ isActive }) => (isActive ? "active" : "")}><BarChartIcon style={style}/>랭킹/차트</NavLink></Menu>
          <Menu><NavLink to="/news" className={({ isActive }) => (isActive ? "active" : "")}><TrendingUpIcon style={style}/>트렌딩</NavLink></Menu>
          <Menu><NavLink to="/mypage/hanbin" className={({ isActive }) => (isActive ? "active" : "")}><PersonIcon style={style}/>마이페이지</NavLink></Menu>
        </MenuTab>
      </MenuSection>
      <MenuSection>
        <MenuTab>
          <Menu><NavLink to="data"><HelpIcon style={style}/>데이터 산출 근거</NavLink></Menu>
          <Menu><Link to="/"><LogoutIcon style={style}/>로그아웃</Link></Menu>
        </MenuTab>
      </MenuSection>
    </MenuBackground>
  );
}

export default MenuBar;
