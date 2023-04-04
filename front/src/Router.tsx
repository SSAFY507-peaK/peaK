import RankingPage, { loader as RankingLoader } from "./routes/RankingPage";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import ChartPage from "./routes/ChartPage";
import ErrorPage from "./routes/ErrorPage";
import IdolPage from "./routes/IdolPage";
import Layout from "./routes/Layout";
import MainPage from "./routes/MainPage";
import MyPage from "./routes/MyPage";
import SignUpPage from "./routes/SignUpPage/SignUpPage";
// import FullPage from "./routes/FullPage/FullPage"
import TmpFullPage from "./routes/FullPage/tmpFullPage";
import RankingLayout from "./routes/RankingLayout";
import TrendingPage from "./routes/TrendingPage";

// import TmpFullPage from "./routes/FullPage/tmpFullPage";

// import {action as LoginAction} from "./routes/LoginModal/LoginModal";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/*<Route path="/intro" element={ <FullPage /> } />*/}
      <Route path="/intro" element={<TmpFullPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route errorElement={<ErrorPage />}>
          <Route index element={<MainPage />} />

          <Route path="ranking" element={<RankingLayout />}>
            <Route index element={<RankingPage />} loader={RankingLoader} />
            <Route path="chart" element={<ChartPage />} />
          </Route>

          <Route path="trending" element={<TrendingPage />} />

          <Route path=":idolName" element={<IdolPage />} />
          <Route path="mypage/:userName" element={<MyPage />} />
        </Route>
      </Route>
    </Route>,
  ),
);

export default router;
