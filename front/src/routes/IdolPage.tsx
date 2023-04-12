import { CreateIdolRank, CreateIdolWeeklyRank, CreatePosNegWeek } from "../_store/slices/IdolDetailChartSlice";
import { CreateNewsData, InitializeNewsData } from "../_store/slices/IdolDetailNewsSlice";
import { useAppDispatch, useAppSelector } from "../_hooks/hooks";

import { CreateIdolChat } from "../_store/slices/IdolDetailChatSlice";
import { CreateIdolSns } from "../_store/slices/IdolDetailSnsSlice";
import { CreateWordCount } from "../_store/slices/IdolDetailWordCountSlice";
import IdolData from "../components/idolpage/IdolProfile/IdolData";
import IdolEmotion from "../components/idolpage/idolemotion/IdolEmotion";
import IdolKeyword from "../components/idolpage/idolkeyword/IdolKeyword";
import IdolList from "../components/idolpage/IdolList";
import IdolYoutube from "../components/idolpage/IdolYoutube";
import { TimeTracker } from "../_utils/UserTracker";
import { TrendYoutubeListType } from "../_utils/Types";
import axios from "axios";
import { request } from "../_utils/axios";
import styled from "styled-components";
import { useLoaderData } from "react-router-dom";
import { useParams } from "react-router-dom";

// import { useEffect } from "react";

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

export type IdolNameProps = {
  idolName: string;
  favIdols?: string[];
};
function IdolPage() {
  const IdolYoutubeList = useLoaderData() as TrendYoutubeListType[];
  const params = useParams();
  const idolName = params.idolName || "";
  TimeTracker(`/${idolName}`);
  // const favIdols = useAppSelector(state => state.myInterest.idols.map(idol => idol.idol));

  const TOKEN = useAppSelector(state => state.userInfo.TOKEN);
  const headers = {Authorization: TOKEN}
  const dispatch = useAppDispatch()

  /** 관심 아이돌 sns Store에 저장 */
  request("get", `/idol/${idolName}`,"", headers).then(res => dispatch(CreateIdolSns(res)))

  /** 관심 아이돌 댓글 Store에 저장 */
  request("get", `/idol/${idolName}/comment`).then(res => dispatch(CreateIdolChat(res)));

  /** 차트관련 정보 Store에 저장 */
  // request("get", `/idol/${idolName}/pos-neg`,"",headers ).then(res => dispatch(CreatePosNegWeek(res)))
  // request("get", `/peak/weekly/${idolName}`,"",headers)
  //   .then(res => {
  //       dispatch(CreateIdolRank(res.current))
  //       dispatch(CreateIdolWeeklyRank(res.rankWeek))
  //   })

  /** 뉴스관련 정보 Store에 저장 */
  // request("get", `/news/list/keywords/${idolName}`)
  //   .then(res => {
  //     console.log(res)
  //     dispatch(CreateNewsData(res.newsList))
  //   })
  // request("get", `/news/list/keywords/${idolName}`).then(res => { dispatch(CreateWordCount(res.wordCounter))})
  

  return (
    <Wrapper>
      <IdolList idolName={idolName} />
      <TopFrame>
        <IdolData idolName={idolName} />
        <TopRightFrame>
          <IdolEmotion />
          {/* <IdolKeyword /> */}
        </TopRightFrame>
      </TopFrame>
      {/* <BottomFrame>
        <IdolYoutube data={IdolYoutubeList} />
      </BottomFrame> */}
    </Wrapper>
  );
}

export default IdolPage;
