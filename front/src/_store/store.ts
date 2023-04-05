import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import { myinterest } from './slices/InterestSlice';
import userInfoReducer from './slices/UserSlice';

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    myinterest: myinterest.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
