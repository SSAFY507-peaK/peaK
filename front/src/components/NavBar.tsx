import { Link, NavLink } from "react-router-dom";

import Button from "./Button";
import { ReactComponent as Logo } from "../assets/peaK.svg";
import Search from "./Search";
import styled from "styled-components";

const Nav = styled.nav`
  width: 100%;
  height: var(--nav-height);
  background-color: var(--white800-color);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding-left: var(--side-space);
  padding-right: var(--side-space);
`;

const Menu = styled.div`
  display: flex;
  align-items: center;

  > * {
    margin-right: 30px;
  }
`;

const ButtonMenu = styled.div`
  display: flex;
  width: auto;

  > * {
    margin-left: 30px;
  }
`;

function NavBar() {
  //추후 로그인 기능 완성 후 로그인 여부에 따라 다르게 렌더링
  return (
    <Nav>
      <Menu>
        <Link to="/">
          <Logo style={{ marginTop: "10px" }} />
        </Link>

        <NavLink
          to="/ranking"
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? "bold" : "",
            };
          }}
        >
          랭킹/차트
        </NavLink>
        <NavLink
          to="/mypage"
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? "bold" : "",
            };
          }}
        >
          마이페이지
        </NavLink>
      </Menu>

      <ButtonMenu>
        <Search />
        <Button buttonColor="red">로그아웃</Button>
      </ButtonMenu>
    </Nav>
  );
}

export default NavBar;
