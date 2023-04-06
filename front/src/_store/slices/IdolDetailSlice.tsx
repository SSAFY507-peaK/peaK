import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../_utils/axios";

export const idolDetail = createSlice({
  name: "idolDetail",
  initialState: {
    currentRank: 0,
    currentScore: 0,
    posNegWeek: [],
  },
  reducers: {
    CreateIdolRank(state, action){
      const url = `/peak/weekly/${action.payload}`
      console.log(action.payload)
      request("get", url)
        .then( res => {
          console.log(res)
          state.currentRank = res.current.rank
          state.currentScore = res.current.score
          state.posNegWeek = res.rankWeek
        }
      )

    },
    CreatePosNegWeek(state, action){
      state.posNegWeek = action.payload
    }
  }
})


export const { CreateIdolRank, CreatePosNegWeek } = idolDetail.actions
export default idolDetail.reducer
