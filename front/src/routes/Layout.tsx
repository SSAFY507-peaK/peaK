import MenuBar from "../components/LayoutPage/MenuBar";
import RouteChangeTracker from "../_utils/RouteChangeTracker";
import Wrapper from "../components/LayoutPage/Wrapper";
import styled from "styled-components";

// const Background = styled.div`
//   width: 100vw;
//   height: 100vh;
// `;

// const DashboardFrame = styled.div`
//   height: 100vh;
//   width: 100vw;
//   border-radius: 30px;
//   background: rgba(255, 255, 255, 0.5);
//
//   display: flex;
// `;

const Frame = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

/** nav바랑 footer를 담는 페이지. 아래 Outlet에 진짜 페이지들이 렌더링됩니다. */
function Layout() {
  RouteChangeTracker();

  return (
      <Frame>
        <MenuBar />
        <Wrapper />
      </Frame>
  );
}

export default Layout;
