import React from 'react';
import { Outlet } from 'react-router-dom'

/** nav바랑 footer를 담는 페이지. 아래 Outlet에 진짜 페이지들이 렌더링됩니다. */
function Layout() {
  return (
    <div>
      <div>Nav바가 올 위치</div>

      <Outlet />

      <div>Footer가 올 위치</div>
    </div>
  );
}

export default Layout;