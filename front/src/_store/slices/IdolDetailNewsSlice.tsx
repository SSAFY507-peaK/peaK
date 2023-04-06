import { NewsType, WordCloud } from "../../_utils/Types";

import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../_utils/axios";

export const idolDetailNews = createSlice({
  name: "idolDetailNews",
  initialState: {
    keywordList: [] as string[],
    newsList:[] as NewsType[],
    wordCloud: [] as WordCloud[]
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
    },
    /** 워드 클라우드 정제 */
    CreateWordCloud(state, action) {
      const wordCloudtList = action.payload
      let tmpWordCloud = []
      for ( const [key, value] of wordCloudtList ) {
        tmpWordCloud.push({text:key, value:value})
      }
      state.wordCloud = [...tmpWordCloud]
    }

  }
})


export const { CreateNewsData, CreateWordCloud } = idolDetailNews.actions
export default idolDetailNews.reducer