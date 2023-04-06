import { CreateIdolRank, CreatePosNegWeek } from "../_store/slices/IdolDetailChartSlice";
import { CreateNewsData, CreateWordCloud } from "../_store/slices/IdolDetailNewsSlice";

import IdolData from "../components/idolpage/IdolProfile/IdolData";
import IdolEmotion from "../components/idolpage/idolemotion/IdolEmotion";
import IdolKeyword from "../components/idolpage/idolkeyword/IdolKeyword";
import IdolList from "../components/idolpage/IdolList";
import IdolYoutube from "../components/idolpage/IdolYoutube";
import { TimeTracker } from "../_utils/UserTracker";
import { request } from "../_utils/axios";
import styled from "styled-components";
import { useAppDispatch } from "../_hooks/hooks";
import { useEffect } from "react";
import {useParams} from "react-router-dom";
import { CreateIdolChat } from "../_store/slices/IdolDetailChatSlice";
import { CreateTOKEN } from "../_store/slices/UserSlice";

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

const BottomFrame = styled.div`
`;
export type IdolNameProps = {
  idolName: string;
}
function IdolPage() {
  const params = useParams();
  const idolName = params.idolName || "";
  TimeTracker(`/${idolName}`)

  const dispatch = useAppDispatch()

  /** 관심 아이돌 댓글 Store에 저장 */
  request("get", `/idol/${idolName}/comment`).then(res => dispatch(CreateIdolChat(res)))
  
  /** 차트관련 정보 Store에 저장 */
  // request("get", `/idol/${idolName}/pos-neg` ).then(res =>  dispatch(CreatePosNegWeek(res)))
  request("get", `/idol/${idolName}/pos-neg` ).then(res =>  res.posNegWeek.length ? dispatch(CreatePosNegWeek(res)) : dispatch(CreateNewsData({posNegWeek:{pos: 0, neg: 0}})))
  // request("get", `/peak/weekly/${idolName}`).then(res => dispatch(CreateIdolRank(res)))
  
  /** 뉴스관련 정보 Store에 저장 */
  // request("get", `/news/list/keywords/${idolName}`)
  //   .then(res => { 
  //     dispatch(CreateNewsData(res.newsList));
  //     dispatch(CreateWordCloud(res.wordCounter));
  //   })
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
        <IdolYoutube />
      </BottomFrame>
    </Wrapper>
  );
}

export default IdolPage;
