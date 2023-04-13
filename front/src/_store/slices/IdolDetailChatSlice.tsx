import { createSlice } from "@reduxjs/toolkit";

export const idolDetailChat = createSlice({
  name: "idolDetailChat",
  initialState: { comments: []},
  reducers: {
    CreateIdolChat(state, action){
      state.comments = action.payload.comments
    },

  }
})


export const { CreateIdolChat } = idolDetailChat.actions
export default idolDetailChat.reducer
