import styled from "styled-components";

import { RedButton } from "../Button";
import { ReactComponent as Logo } from "../../assets/peaK.svg";

const Header = styled.header`
  width: 100%;
  height: var(--nav-height);

  position: fixed;
  top: 0;
  left: 0;

  //position: relative;
  //left: 50%;
  //transform: translate(-50%, 0);

  display: flex;
  justify-content: center;
`;

const Nav = styled.nav`
  width: var(--content-space);
  height: 100%;
  //height: var(--nav-height);

  background-color: transparent;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function NavBar() {
  //추후 로그인 기능 완성 후 로그인 여부에 따라 다르게 렌더링
  return (
    <Header>
      <Nav>
        <Logo style={{ marginTop: "10px" }} />
        <RedButton>로그인</RedButton>
      </Nav>
    </Header>
  );
}

export default NavBar;
