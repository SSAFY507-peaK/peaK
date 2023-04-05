import ReactGA, { EventArgs } from 'react-ga';
import { useEffect, useState } from "react";

import { ClickTracker } from '../ClickTracker';
import IdolKeywordRankBtn from "./IdolKeywordRankBtn";
import TitleComponent from "../TitleComponent";
import styled from "styled-components";
import { useParams } from 'react-router';
import { useAppSelector } from '../../../_hooks/hooks';

interface Props {
  setChooseKeyword: React.Dispatch<React.SetStateAction<number>>;
  chooseKeyword: number;
}

const RankFrame = styled.div`
  margin-bottom: 20px;
`;


function IdolKeywordRank({setChooseKeyword, chooseKeyword}:Props) {
  const dumy = [
    {
      rank: "1",
      keyword: "주희발빠집주의!"
    }, 
    {
      rank: "2",
      keyword: "정보처리기사"
    }, 
    {
      rank: "3",
      keyword: "실기책 비쌈"
    }, 
    {
      rank: "4",
      keyword: "잔디 언제심지"
    }, 
    {
      rank: "5",
      keyword: "아아아아아아"
    },
  ]

  const params = useParams();
  const idolName:string = params.idolName || "";
  const [check, setCheck] = useState<boolean[]>([true, false, false, false, false])
  
  return (
    <RankFrame>
      {
        dumy.map((e, idx) => {
          return (
            <IdolKeywordRankBtn
              key={idx}
              rank={e.rank}
              keyword={e.keyword}
              onClick={()=>
                {
                  const tmp = [ false ,false, false, false, false]
                  tmp[idx] = true
                  setCheck(tmp)
                  setChooseKeyword(idx)
                  ClickTracker(idolName)
                }
              }
              isClick={check[idx]}
            ></IdolKeywordRankBtn>
          )

        })
      }
    </RankFrame>
  )
}

export default IdolKeywordRank;