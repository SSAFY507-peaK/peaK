import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './_store/store';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import Layout from './routes/Layout'
import ErrorPage from './routes/ErrorPage';

import MainPage from './routes/MainPage'
import NicknamePage from './routes/NicknamePage';
import SelectPage from './routes/SelectPage';

import RankingLayout from './routes/RankingLayout'
import RankingPage from './routes/RankingPage'
import ChartPage from './routes/ChartPage';

import NewsPage from './routes/NewsPage';
import NewsDetailPage from './routes/NewsDetailPage';

import IdolPage from './routes/IdolPage';
import MyPage from './routes/MyPage';

import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={ <Layout /> } errorElement={ <ErrorPage /> } >
        <Route errorElement={ <ErrorPage /> }>
          <Route index element={ <MainPage /> } />
          <Route path='signup/nickname' element={ <NicknamePage /> } />
          <Route path='signup/select' element={ <SelectPage /> } />

          <Route path='ranking' element={ <RankingLayout /> }>
            <Route index element={ <RankingPage /> } />
            <Route path='chart' element={ <ChartPage /> } />
          </Route>

          <Route path='news' element={ <NewsPage /> } />
          <Route path='news/:idolName' element={ <NewsDetailPage /> } />

          <Route path=':idolName' element={ <IdolPage /> } />
          <Route path="mypage/:userName" element={ <MyPage /> } />
        </Route>
      </Route>
    </Route>
  ));

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
