import React from "react";
import { Link, NavLink } from "react-router-dom";

import BarChartIcon from "@mui/icons-material/BarChart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HelpIcon from "@mui/icons-material/Help";
import HomeIcon from "@mui/icons-material/Home";
import { ReactComponent as Logo } from "../../assets/peaK.svg";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { SearchList } from "../Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import styled from "styled-components";
// import {useAppSelector} from "../../_hooks/hooks";

const MenuBackground = styled.nav`
  flex: 1 0 250px;
  height: 100%;
  padding: 40px 0;
  background-color: white;

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
  align-items: flex-end;
`;

const Menu = styled.div`
  width: 90%;
  color: var(--gray400-color);
  transition: all 300ms ease-in;
  
  > * {
    display: flex;
    align-items: center;
    padding: 12px 0 12px 30px;
    margin-bottom: 3px;
    border-radius: 15px 0 0 15px;

    &:hover {
      font-weight: 600;
    }
    &.logout:hover {
      color: var(--red600-color);
      background-color: var(--red900-color);
      border-right: 4px solid var(--red400-color);
    }

    &.active {
      color: var(--purple500-color);
      border-right: 4px solid var(--purple400-color);
      font-weight: 600;
      background-color: var(--background-color);
    }
  }
`;

const style = { marginRight: "10px", fontSize: "medium" };

type MenuBarProps = {
  nickname: string;
  favIdols: string[];
}
function MenuBar({ nickname, favIdols }: MenuBarProps) {
  // const favIdols = useAppSelector(state => state.userInfo.favIdols);
  // console.log(favIdols);
  const randomIdol = favIdols.length && favIdols[Math.floor(Math.random() * favIdols.length)];
  return (
    <MenuBackground>
      <MenuSection>
        <Link to="/">
          <Logo />
        </Link>
        <SearchList width="220px" />
        <MenuTab>
          <Menu>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              <HomeIcon style={style} />홈
            </NavLink>
          </Menu>
          <Menu>
            <NavLink to={`/${randomIdol}`} className={({ isActive }) => (isActive ? "active" : "")}>
            {/*<NavLink to={`/BTS`} className={({ isActive }) => (isActive ? "active" : "")}>*/}
              <FavoriteIcon style={style} />
              관심 아이돌
            </NavLink>
          </Menu>
          <Menu>
            <NavLink to="/ranking" className={({ isActive }) => (isActive ? "active" : "")}>
              <BarChartIcon style={style} />
              랭킹/차트
            </NavLink>
          </Menu>
          <Menu>
            <NavLink to="/trending" className={({ isActive }) => (isActive ? "active" : "")}>
              <TrendingUpIcon style={style} />
              트렌딩
            </NavLink>
          </Menu>
          <Menu>
            <NavLink to={`/mypage/${nickname}`} className={({ isActive }) => (isActive ? "active" : "")}>
              <PersonIcon style={style} />
              마이페이지
            </NavLink>
          </Menu>
        </MenuTab>
      </MenuSection>
      <MenuSection>
        <MenuTab>
          <Menu>
            <NavLink to="data">
              <HelpIcon style={style} />
              데이터 산출 근거
            </NavLink>
          </Menu>
          <Menu>
            <Link className="logout" onClick={() => localStorage.clear()} to="/intro">
              <LogoutIcon style={style} />
              로그아웃
            </Link>
          </Menu>
        </MenuTab>
      </MenuSection>
    </MenuBackground>
  );
}

export default React.memo(MenuBar);
