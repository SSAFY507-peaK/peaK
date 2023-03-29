import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import MainPage, { loader as MainLoader } from "./routes/MainPage";
import ChartPage from "./routes/ChartPage";
import ErrorPage from "./routes/ErrorPage";
import IdolPage from "./routes/IdolPage";
import Layout from "./routes/Layout";
import MyPage from "./routes/MyPage";
import NewsDetailPage from "./routes/NewsDetailPage";
import NewsPage from "./routes/NewsPage";
import SignUpPage from "./routes/SignUpPage";
import RankingLayout from "./routes/RankingLayout";
import RankingPage from "./routes/RankingPage";
import TmpFullPage from "./routes/FullPage/tmpFullPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/*<Route path="/intro" element={ <FullPage /> } />*/}
      <Route path="/intro" element={<TmpFullPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route errorElement={<ErrorPage />}>
          <Route index element={<MainPage />} loader={MainLoader} />

          <Route path="ranking" element={<RankingLayout />}>
            <Route index element={<RankingPage />} />
            <Route path="chart" element={<ChartPage />} />
          </Route>

          <Route path="news" element={<NewsPage />} />
          <Route path="news/:idolName" element={<NewsDetailPage />} />

          <Route path=":idolName" element={<IdolPage />} />
          <Route path="mypage/:userName" element={<MyPage />} />
        </Route>
      </Route>
    </Route>,
  ),
);

export default router;
