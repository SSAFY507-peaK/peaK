import { createSlice } from "@reduxjs/toolkit";

export const idolDetailSns = createSlice({
  name: "idolDetailSns",
  initialState: { 
    idol: "",
    SnsData: {
      instagram: "",
      youtube: "",
      twitter: ""    
    },
    interest: ""
  },
  reducers: {
    CreateIdolSns(state, action){
      state = action.payload
    },

  }
})


export const { CreateIdolSns } = idolDetailSns.actions
export default idolDetailSns.reducer
