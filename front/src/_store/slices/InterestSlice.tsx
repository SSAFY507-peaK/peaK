import { IdolInterest } from '../../_utils/Types';
import { createSlice } from '@reduxjs/toolkit';

export let myinterest = createSlice({
  name: "myinterest",
  initialState: { idols: [] } as IdolInterest,

  reducers: {
    CreateMyInterest(state, action){
      state.idols = action.payload;
    }
  }
})

export let { CreateMyInterest } = myinterest.actions