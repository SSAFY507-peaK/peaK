import { CreateIdolRank, CreateIdolWeeklyRank, CreatePosNegWeek } from "../_store/slices/IdolDetailChartSlice";
import { CreateNewsKeyword, CreateNewsList } from "../_store/slices/IdolDetailNewsSlice";
import { TrendYoutubeListType, WordData } from "../_utils/Types";
import { useAppDispatch, useAppSelector } from "../_hooks/hooks";

import { CreateIdolChat } from "../_store/slices/IdolDetailChatSlice";
import { CreateIdolSns } from "../_store/slices/IdolDetailSnsSlice";
import { CreateWordCount } from "../_store/slices/IdolDetailWordCountSlice";
import IdolData from "../components/IdolPage/IdolProfile/IdolData";
import IdolEmotion from "../components/IdolPage/IdolEmotion/IdolEmotion";
import IdolKeyword from "../components/IdolPage/IdolKeyword/IdolKeyword";
import IdolList from "../components/IdolPage/IdolList";
import IdolYoutube from "../components/IdolPage/IdolYoutube";
import { TimeTracker } from "../_utils/UserTracker";
import axios from "axios";
import { request } from "../_utils/axios";
import styled from "styled-components";
import { useLoaderData } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useMemo } from "react";


export type IdolNameProps = {
  idolName: string;
  favIdols?: string[];
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopFrame = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
`;

const TopRightFrame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.65;
  margin-right: 15px;
`;

const BottomFrame = styled.div``;

const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function loader({ params }: { params: any }) {
  const IdolName = params.idolName;
  let IdolYoutubeList;
  await axios
    .get(`${BASE_URL}/api/youtube/${IdolName}`)
    .then(response => {
      IdolYoutubeList = response.data;
    })
    .catch(error => console.log(error));
  return IdolYoutubeList;
}



function IdolPage() {
  const IdolYoutubeList = useLoaderData() as TrendYoutubeListType[];
  const params = useParams();
  const idolName = params.idolName || "";
  const favIdols = useAppSelector(state => state.myInterest.idols.map(idol => idol.idol));

  const TOKEN = useAppSelector(state => state.userInfo.TOKEN);
  const headers = {Authorization: TOKEN}
  const dispatch = useAppDispatch()



  const getData = async () => {
    /** 관심 아이돌 sns Store에 저장 */
    const resultSns = await request("get", `/idol/${idolName}`,"", headers);
    /** 관심 아이돌 댓글 Store에 저장 */
    const resultChat = await request("get", `/idol/${idolName}/comment`);
    /** 차트관련 정보 Store에 저장 */
    const resultPosNegChart = await request("get", `/idol/${idolName}/pos-neg`,"",headers );
    // const resultWeeklyData = await request("get", `/peak/weekly/${idolName}`,"",headers);
    /** 뉴스관련 정보 Store에 저장 */
    const resultNewsList = await request("get", `/news/list/keywords/${idolName}`);
    const resultWordCloud = await request("get", `/news/list/keywords/${idolName}`);
    
    dispatch(CreateIdolSns(resultSns))
    dispatch(CreateIdolChat(resultChat))
    dispatch(CreatePosNegWeek(resultPosNegChart))
    // dispatch(CreateIdolRank(resultWeeklyData.current))
    // dispatch(CreateIdolWeeklyRank(resultWeeklyData.rankWeek))
    const newsList = resultNewsList.newsList
    let tmpKeyword = []
    let tmpNews = []
    for ( let i = 0; i< newsList.length; i++){
      tmpKeyword.push(newsList[i].keyword)
      tmpNews.push(newsList[i].newsList)
    }
    dispatch(CreateNewsKeyword(tmpKeyword))
    dispatch(CreateNewsList(tmpNews))
    let tmpWordCloud: WordData[][] = [];
    for ( let i = 0; i< 5; i++){
      let wordList = resultWordCloud.wordCounter[i].wordCounter
      let tmp: WordData[] = [];
      if (typeof wordList !== "undefined"){
        for ( let key in wordList ) {
          tmp.push({text:key, value:wordList[key]})
        }
      tmpWordCloud.push(tmp)
      }
    }
    dispatch(CreateWordCount(tmpWordCloud))
  }


  useMemo(() => {
    TimeTracker(`/${idolName}`);
    getData();
  },[idolName])

  return (
    <Wrapper>
      <IdolList idolName={idolName} />
      <TopFrame>
        <IdolData idolName={idolName} />
        <TopRightFrame>
          <IdolEmotion />
          <IdolKeyword />
        </TopRightFrame>
      </TopFrame>
      <BottomFrame>
        <IdolYoutube data={IdolYoutubeList} />
      </BottomFrame>
    </Wrapper>
  );
}

export default IdolPage;
