import {Action, ThunkAction, configureStore, combineReducers} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import myInterestReducer from './slices/InterestSlice';
import userInfoReducer from './slices/UserSlice';
import idolDetailReducer from './slices/IdolDetailSlice';

// storage에 저장할거야
const persistConfig = {
  key: 'root',
  storage,
};

// 이게 진짜 우리의 리듀서
const rootReducers = combineReducers({
  userInfo: userInfoReducer,
  myInterest: myInterestReducer,
  idolDetail: idolDetailReducer,
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
