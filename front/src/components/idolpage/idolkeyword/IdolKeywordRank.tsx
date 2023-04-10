import {  useState } from "react";

import { ClickTracker } from '../../../_utils/UserTracker';
import IdolKeywordRankBtn from "./IdolKeywordRankBtn";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from '../../../_hooks/hooks';
import { useParams } from 'react-router';

interface Props {
  setChooseKeyword: React.Dispatch<React.SetStateAction<number>>;
  chooseKeyword: number;
  keyWordList: string[];
}

const RankFrame = styled.div`
  margin-bottom: 20px;
`;


function IdolKeywordRank({setChooseKeyword, chooseKeyword, keyWordList}:Props) {
  // const keywords = useAppSelector(state => state.idolDetailNews.keywordList)
  // const keyWordList = ["주희발빠짐주의!", "배고픈이문세", "갓귤", "돌아돌아", "오오오오"]

  const params = useParams();
  const idolName:string = params.idolName || "";
  const [check, setCheck] = useState<boolean[]>([true, false, false, false, false])
  const userId:string = useAppSelector(state => state.userInfo.userId)

  return (
    <RankFrame>
      {
        keyWordList.map((e, idx) => {
          return (
            <IdolKeywordRankBtn
              key={idx}
              rank={idx+1}
              keyword={e}
              onClick={()=>
                {
                  const tmp = [ false ,false, false, false, false]
                  tmp[idx] = true
                  setCheck(tmp)
                  setChooseKeyword(idx)
                  ClickTracker(idolName, userId)
                }
              }
              isClick={check[idx]}
            />
          )

        })
      }
    </RankFrame>
  )
}

export default IdolKeywordRank;