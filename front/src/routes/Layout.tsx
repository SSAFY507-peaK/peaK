import {CreateNickname, CreateTOKEN, CreateUserId} from "../_store/slices/UserSlice";
import ReactGA, { ga } from "react-ga";
import {useDispatch, useSelector} from "react-redux";

import MenuBar from "../components/LayoutPage/MenuBar";
import {RootState} from "../_store/store";
import RouteChangeTracker from "../_utils/RouteChangeTracker";
import Wrapper from "../components/LayoutPage/Wrapper";
import styled from "styled-components";
import {useAppSelector} from "../_hooks/hooks";
import {useEffect} from "react";
import {useNavigate} from "react-router";
import {useSearchParams} from "react-router-dom";

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
  const [query, setQuery] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userId = useSelector((state:RootState) => state.userInfo.userId);
  let token = useSelector((state:RootState) => state.userInfo.TOKEN);
  let nickname = useAppSelector(state => state.userInfo.nickname)
  useEffect(() => {
    if (query.get('token')) {
      dispatch(CreateTOKEN(query.get('token')));
      dispatch(CreateUserId(query.get('userId')));
      dispatch(CreateNickname(query.get('nickname')));
      // ReactGA.set({ userId: userId });
      ga('set', 'userId', userId); // 사용자 ID 설정
      window.history.pushState({}, "", "/")
    }
    else {
      if (token !== "") {
        // ReactGA.set({ userId: userId });
        ga('set', 'userId', userId); // 사용자 ID 설정
      }
      else {
        navigate('/intro');
      }
    }
  }, [dispatch, navigate, query, token, userId]);

  RouteChangeTracker();

  return (
      <Frame>
        <MenuBar nickname={nickname} />
        <Wrapper />
      </Frame>
  );
}

export default Layout;
