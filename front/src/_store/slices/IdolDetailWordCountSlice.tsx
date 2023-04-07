import { WordData } from "../../_utils/Types";

import { createSlice } from "@reduxjs/toolkit";

export const idolDetailWordCount = createSlice({
  name: "idolDetailWordCount",
  initialState: {
    wordCloud: [] as WordData[][]
  },
  reducers: {
    /** 뉴스 키워드 정제 */
    CreateWordCount(state, action){
      const wordCloudtList = action.payload

      let tmpWordCloud: WordData[][] = [];
      for ( let i = 0; i< 5; i++){
        let wordList = wordCloudtList[i].wordCounter
        let tmp: WordData[] = [];
        if (typeof wordList !== "undefined"){
          for ( let key in wordList ) {
            tmp.push({text:key, value:wordList[key]})
          }
        tmpWordCloud.push(tmp)
        }
      }
      state.wordCloud = [...tmpWordCloud]
    }
  }
})


export const { CreateWordCount } = idolDetailWordCount.actions
export default idolDetailWordCount.reducer