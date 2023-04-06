import { CreateIdolRank, CreatePosNegWeek } from "../_store/slices/IdolDetailSlice";

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
  // dispatch(CreateIdolRank(idolName))
  // dispatch(CreatePosNegWeek(idolName))
  request("get", `/idol/${idolName}/pos-neg` ).then(res =>  dispatch(CreatePosNegWeek(res)))
  // request("get", `/peak/weekly/${idolName}`).then(res => dispatch(CreateIdolRank(res)))
  
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
