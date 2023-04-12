import { createSlice } from "@reduxjs/toolkit";

export const idolDetailSns = createSlice({
  name: "idolDetailSns",
  initialState: { 
    idol: "",
    snsLink: {
      instagram: "",
      youtube: "",
      twitter: ""    
    },
    interest: false
  },
  reducers: {
    CreateIdolSns(state, action){
      state.idol = action.payload.idol
      state.snsLink = action.payload.snsLink
      state.interest = action.payload.interest
    },
    UpdateIdolInterest(state, action){
      state.interest = action.payload
    }

  }
})


export const { CreateIdolSns, UpdateIdolInterest } = idolDetailSns.actions
export default idolDetailSns.reducer
