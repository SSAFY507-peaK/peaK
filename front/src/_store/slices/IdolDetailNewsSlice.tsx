import { NewsType } from "../../_utils/Types";
import { createSlice } from "@reduxjs/toolkit";

export const idolDetailNews = createSlice({
  name: "idolDetailNews",
  initialState: {
    keywordList: [] as string[],
    newsList:[] as NewsType[][],
  },
  reducers: {
    /** 뉴스 키워드 정제 */
    CreateNewsKeyword(state, action){
      state.keywordList = action.payload
    },
    CreateNewsList(state, action){
      state.newsList = action.payload
    },
    ResetDetailNews(state){
      state.keywordList = []
      state.newsList = []
    }
  }
})


export const { CreateNewsKeyword, CreateNewsList, ResetDetailNews } = idolDetailNews.actions
export default idolDetailNews.reducer