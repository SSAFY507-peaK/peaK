import { createSlice } from "@reduxjs/toolkit";

export let userinfo = createSlice({
  name: "userinfo",
  initialState: {
    id: "",
    email:"",
    role: "",
    nickname: "",
    provider: "",
    last_login_datatime: "",
    favorite_idols_cnt: "",
    idols: []
  },
  reducers: {
    CreateUserInfo(state, action){
      state = action.payload
    }
  }
})

export let { CreateUserInfo } = userinfo.actions