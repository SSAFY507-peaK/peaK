import { IdolInterest } from '../../_utils/Types';
import { createSlice } from '@reduxjs/toolkit';

export let myInterest = createSlice({
  name: "myInterest",
  initialState: { idols: [] } as IdolInterest,
  reducers: {
    CreateMyInterest(state, action){
      state.idols = action.payload;
    }
  }
})

export let { CreateMyInterest } = myInterest.actions
export default myInterest.reducer