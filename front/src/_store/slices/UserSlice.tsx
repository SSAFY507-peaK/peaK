import { createSlice } from "@reduxjs/toolkit";

export let userInfo = createSlice({
  name: "userInfo",
  initialState: {
    // id: "",
    // email:"",
    // role: "",
    nickname: "",
    // provider: "",
    // last_login_datatime: "",
    // favorite_idols_cnt: "",
    idols: [],
    TOKEN: "",
  },
  reducers: {
    CreateUserInfo(state, action){
      state = action.payload
    },
    CreateNickname(state, action) {
      state.nickname = action.payload
    },
    CreateFavIdols(state, action) {
      state.idols = action.payload
    },
    CreateTOKEN(state, action) {
      state.TOKEN = action.payload
    }
  }
})

export let { CreateUserInfo, CreateNickname, CreateFavIdols, CreateTOKEN } = userInfo.actions
export default userInfo.reducer