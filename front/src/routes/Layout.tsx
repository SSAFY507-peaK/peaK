import {CreateFavIdols, CreateNickname, CreateTOKEN, CreateUserId, } from "../_store/slices/UserSlice";
import { ga } from "react-ga";
import {useDispatch } from "react-redux";

import MenuBar from "../components/LayoutPage/MenuBar";
import RouteChangeTracker from "../_utils/RouteChangeTracker";
import Wrapper from "../components/LayoutPage/Wrapper";
import styled from "styled-components";
import {useAppSelector} from "../_hooks/hooks";
import {useEffect} from "react";
import {useNavigate} from "react-router";
import {useSearchParams} from "react-router-dom";
import axios from "axios";

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
const BASE_URL = process.env.REACT_APP_BASE_URL;

/** nav바랑 footer를 담는 페이지. 아래 Outlet에 진짜 페이지들이 렌더링됩니다. */
function Layout() {
  const [query, setQuery] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userId = useAppSelector(state => state.userInfo.userId);
  let token = useAppSelector(state => state.userInfo.TOKEN);
  let nickname = useAppSelector(state => state.userInfo.nickname);
  let favIdols = useAppSelector(state => state.userInfo.favIdols);

  const userInfoFunction = async () => {
    if (query.get('token')) {   // 로그인 후에는 query에 token이 들어있으므로 그 값을 저장하자.
      dispatch(CreateTOKEN(query.get('token')));
      dispatch(CreateUserId(query.get('userId')));
      dispatch(CreateNickname(query.get('nickname')));

      await axios.get(`${BASE_URL}/api/interest/list`, {
        headers: {
          Authorization: token
        }
      })
        .then(response => {
          console.log(response.data);
          return response.data.idols
        })
        .then(idols => dispatch(CreateFavIdols(idols)))
        .catch(error => console.log(error));

      ga('set', userId, userId);
      window.history.pushState({}, "", "/")
    }
    else {
      if (token) {   // 토큰이 있으면 토큰 유효성을 검사하자
        await axios.post(`${BASE_URL}/api/user/reissue`, {}, {
          headers: {
            Authorization: token
          }
        })
          .then(response => {
            return response.data.token
          })
          .then(token => {
            const TOKEN = `Bearer ${token}`
            dispatch(CreateTOKEN(TOKEN));
          })
          .catch(error => {
            console.log(error);
            window.localStorage.clear();
            navigate('/intro');
          })

        // 리덕스에 값이 없으면 요청하기
        await favIdols.length === 0 && axios.get(`${BASE_URL}/api/interest/list`, {
          headers: {
            Authorization: token
          }
        })
          .then(response => {
            console.log(response.data);
            return response.data.idols
          })
          .then(idols => dispatch(CreateFavIdols(idols)))
          .catch(error => console.log(error));
      }
      else {    // 토큰이 없으면 intro로 보내버리자.
        navigate('/intro');
      }
    }
  }

  userInfoFunction();

  /** ga에 대한 것, userId가 존재하면 ga 시작 */
  useEffect(() => {
    userId.length && ga('set', userId, userId);
  }, [userId]);

  RouteChangeTracker();

  return (
      <Frame>
        <MenuBar nickname={nickname} />
        <Wrapper />
      </Frame>
  );
}

export default Layout;
