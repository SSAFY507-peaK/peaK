import { createSlice } from "@reduxjs/toolkit";

export const idolDetailChart = createSlice({
  name: "c",
  initialState: {
    rankData: {
      current:{
        rank: 0,
        score: 0
      },
      rankWeek: [],
    },
    posNegWeek: [
      {
        pos:0,
        neg:0
      },
    ],
  },
  reducers: {
    CreateIdolRank(state, action){
      state.rankData.current = action.payload
    },
    CreateIdolWeeklyRank(state, action){
      state.rankData.rankWeek = action.payload
    },
    CreatePosNegWeek(state, action){
      state.posNegWeek = action.payload.posNegWeek
    }
  }
})


export const { CreateIdolRank, CreateIdolWeeklyRank, CreatePosNegWeek } = idolDetailChart.actions
export default idolDetailChart.reducer
