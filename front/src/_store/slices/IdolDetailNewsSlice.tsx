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
    CreateNewsData(state, action){
      const newsList = action.payload

      let tmpKeyword = []
      let tmpNews = []

      for ( let i = 0; i< 5; i++){
        tmpKeyword.push(newsList[i].keyword)
        tmpNews.push(newsList[i].newsList)

      }

      state.keywordList = [...tmpKeyword]
      state.newsList = [...tmpNews]

    }
  }
})


export const { CreateNewsData } = idolDetailNews.actions
export default idolDetailNews.reducer