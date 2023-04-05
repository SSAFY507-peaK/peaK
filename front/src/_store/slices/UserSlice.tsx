import { createSlice } from "@reduxjs/toolkit";

export let userInfo = createSlice({
  name: "userInfo",
  initialState: {
    userId: 0,
    nickname: "",
    TOKEN: "",
    idols: [],
  },
  reducers: {
    CreateNickname(state, action) {
      state.nickname = action.payload
    },
    CreateFavIdols(state, action) {
      state.idols = action.payload
    },
    CreateTOKEN(state, action) {
      state.TOKEN = action.payload
    },
    CreateUserId(state, action) {
      state.userId = action.payload
    }
  }
})

export let { CreateUserId, CreateNickname, CreateFavIdols, CreateTOKEN } = userInfo.actions
export default userInfo.reducer