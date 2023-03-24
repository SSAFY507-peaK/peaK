import { Link, NavLink } from "react-router-dom";

import Button from "./Button";
import { ReactComponent as Logo } from "../assets/peaK.svg";
import Search from "./Search";
import styled from "styled-components";

const Header = styled.header`
  width: 100%;
  height: var(--nav-height);
  background-color: var(--white800-color);
  box-shadow: 0 2px 2px 0 hsla(0, 0%, 80.8%, 0.5);

  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  justify-content: center;
`;

const Nav = styled.nav`
  width: var(--content-space);
  //height: var(--nav-height);
  height: 100%;

  //text-align: center;
  //background-color: var(--white800-color);

  //position: absolute;
  //left: 50%;
  //transform: translate(-50%, 0);

  display: flex;
  justify-content: space-between;
  align-items: center;
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
    <Header>
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
            to="/mypage/김귤잉꺄"
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
    </Header>
  );
}

export default NavBar;
