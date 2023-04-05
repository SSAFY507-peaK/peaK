import { createSlice } from "@reduxjs/toolkit";



export let idolDetail = createSlice({
  name: "idolDetail",
  initialState: {
    idolRank: "",
    posNegWeek: "",
  },
  reducers: {
    CreateIdolRank(state, action){
      state.idolRank = action.payload
    },
    CreatePosNegWeek(state, action){
      state.posNegWeek = action.payload
    }
  }
})


export let { CreateIdolRank, CreatePosNegWeek } = idolDetail.actions
export default idolDetail.reducer
