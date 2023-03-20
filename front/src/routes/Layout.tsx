import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

/** nav바랑 footer를 담는 페이지. 아래 Outlet에 진짜 페이지들이 렌더링됩니다. */
function Layout() {
  return (
    <div>
      <NavBar />

      <div style={{ paddingLeft: "var(--side-space)", paddingRight: "var(--side-space)" }}>
        <Outlet />
      </div>

      {/* <div>Footer가 올 위치</div> */}
    </div>
  );
}

export default Layout;
