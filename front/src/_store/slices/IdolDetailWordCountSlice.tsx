import { createSlice } from "@reduxjs/toolkit";

export const idolDetailWordCount = createSlice({
  name: "idolDetailWordCount",
  initialState: {
    wordCloud: []
  },
  reducers: {
    /** 뉴스 키워드 정제 */
    CreateWordCount(state, action){
      state.wordCloud = action.payload
    }
  }
})


export const { CreateWordCount } = idolDetailWordCount.actions
export default idolDetailWordCount.reducer