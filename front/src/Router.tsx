import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import MainPage, { loader as MainLoader } from "./routes/MainPage";
import RankingPage, { loader as RankingLoader } from "./routes/RankingPage";
import TrendingPage, { loader as TrendingLoader } from "./routes/TrendingPage";
import { IdolLists } from "./_utils/loader";

import ChartPage from "./routes/ChartPage";
import ErrorPage from "./routes/ErrorPage";
import IdolPage from "./routes/IdolPage";
import Layout from "./routes/Layout";
import MyPage from "./routes/MyPage";
import RankingLayout from "./routes/RankingLayout";
import SignUpPage from "./routes/SignUpPage/SignUpPage";
import FullPage from "./routes/FullPage/FullPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/intro" element={<FullPage />} />
      <Route path="/signup" element={<SignUpPage />} loader={IdolLists} />
      <Route path="/" element={<Layout />} loader={IdolLists} errorElement={<ErrorPage />}>
        <Route errorElement={<ErrorPage />}>
          <Route index element={<MainPage />} loader={MainLoader} />

          <Route path="ranking" element={<RankingLayout />}>
            <Route index element={<RankingPage />} loader={RankingLoader} />
            <Route path="chart" element={<ChartPage />} loader={IdolLists} />
          </Route>

          <Route path="trending" element={<TrendingPage />} loader={TrendingLoader} />

          <Route path=":idolName" element={<IdolPage />} />
          <Route path="mypage/:userName" element={<MyPage />} />
        </Route>
      </Route>
    </Route>,
  ),
);

export default router;
