import { createSlice } from "@reduxjs/toolkit";

type UserInfoType ={
  userId: string;
  nickname: string;
  TOKEN: string;
  favIdols: string[];
}
export let userInfo = createSlice({
  name: "userInfo",
  initialState: {
    userId: "",
    nickname: "",
    TOKEN: "",
    favIdols: [],
  } as UserInfoType,
  reducers: {
    CreateNickname(state, action) {
      state.nickname = action.payload
    },
    CreateTOKEN(state, action) {
      state.TOKEN = action.payload
    },
    CreateUserId(state, action) {
      state.userId = action.payload
    },
    CreateFavIdols(state, action) {
      state.favIdols = action.payload;
    },
    UpdateFavIdols(state, action) {
      const tmp = [ ...state.favIdols, action.payload ]
      state.favIdols = tmp
    },
    DeleteFavIdols(state, action) {
      const tmp = state.favIdols.filter(idol => idol !== action.payload)
      state.favIdols = tmp
    }
  }
})

export let { CreateUserId, CreateNickname, CreateTOKEN, CreateFavIdols, UpdateFavIdols, DeleteFavIdols } = userInfo.actions
export default userInfo.reducer