import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import ChartPage from "./routes/ChartPage";
import ErrorPage from "./routes/ErrorPage";
import { GlobalStyle } from "./components/globalStyle.js";
import IdolPage from "./routes/IdolPage";
import Layout from "./routes/Layout";
import MainPage from "./routes/MainPage";
import MyPage from "./routes/MyPage";
import NewsDetailPage from "./routes/NewsDetailPage";
import NewsPage from "./routes/NewsPage";
import NicknamePage from "./routes/NicknamePage";
import { Provider } from "react-redux";
import RankingLayout from "./routes/RankingLayout";
import RankingPage from "./routes/RankingPage";
import SelectPage from "./routes/SelectPage";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { store } from "./_store/store";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route errorElement={<ErrorPage />}>
          <Route index element={<MainPage />} />
          <Route path="signup/nickname" element={<NicknamePage />} />
          <Route path="signup/select" element={<SelectPage />} />

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

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <GlobalStyle />
    <RouterProvider router={router} />
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
