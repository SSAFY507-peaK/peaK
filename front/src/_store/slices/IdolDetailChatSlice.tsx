import { createSlice } from "@reduxjs/toolkit";
import { Comment, Comments } from "../../_utils/Types";

export const idolDetailChat = createSlice({
  name: "idolDetailChat",
  initialState: { comments: [] as Comment[]},
  reducers: {
    CreateIdolChat(state, action){
      state.comments = action.payload.comments
    },

  }
})


export const { CreateIdolChat } = idolDetailChat.actions
export default idolDetailChat.reducer
