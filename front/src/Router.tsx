import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import ChartPage from "./routes/ChartPage";
import ErrorPage from "./routes/ErrorPage";
import IdolPage from "./routes/IdolPage";
import Layout from "./routes/Layout";
import MainPage from "./routes/MainPage";
import MyPage from "./routes/MyPage";
import SignUpPage from "./routes/SignUpPage";
import FullPage from "./routes/FullPage/FullPage"
import RankingLayout from "./routes/RankingLayout";
import RankingPage from "./routes/RankingPage";
import TrendingPage from "./routes/TrendingPage";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/intro" element={ <FullPage /> } />
      {/*<Route path="/intro" element={<TmpFullPage />} />*/}
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route errorElement={<ErrorPage />}>
          <Route index element={<MainPage />} />

          <Route path="ranking" element={<RankingLayout />}>
            <Route index element={<RankingPage />} />
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
