import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../_utils/axios";

export const idolDetail = createSlice({
  name: "idolDetail",
  initialState: {
    rankData: {
      current:{
        rank: 0,
        score: 0
      },
      rankWeek: [],
    },
    posNegWeek: [],
  },
  reducers: {
    CreateIdolRank(state, action){
      // console.log(action)
      state.rankData = action.payload
    },
    CreatePosNegWeek(state, action){
      state.posNegWeek = action.payload.posNegWeek
    }
  }
})


export const { CreateIdolRank, CreatePosNegWeek } = idolDetail.actions
export default idolDetail.reducer
