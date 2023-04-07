import {Action, ThunkAction, combineReducers, configureStore} from '@reduxjs/toolkit';

import idolDetailNewsReducer from './slices/IdolDetailNewsSlice'
import idolDetailChartReducer from './slices/IdolDetailChartSlice';
import myInterestReducer from './slices/InterestSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userInfoReducer from './slices/UserSlice';
import idolDetailChatReducer from './slices/IdolDetailChatSlice';
import idolDetailWordCountReducer from './slices/IdolDetailWordCountSlice'
import idolDetailSnsReducer from './slices/IdolDetailSnsSlice'

// storage에 저장할거야
const persistConfig = {
  key: 'root',
  storage,
};

// 이게 진짜 우리의 리듀서
const rootReducers = combineReducers({
  userInfo: userInfoReducer,
  myInterest: myInterestReducer,
  idolDetailChart: idolDetailChartReducer,
  idolDetailNews: idolDetailNewsReducer,
  idolDetailChat: idolDetailChatReducer,
  idolDetailWordCount: idolDetailWordCountReducer,
  idolDetailSns: idolDetailSnsReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
