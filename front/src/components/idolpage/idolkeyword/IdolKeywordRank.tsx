import { useEffect, useState } from "react";

import IdolKeywordRankBtn from "./IdolKeywordRankBtn";
import TitleComponent from "../TitleComponent";
import styled from "styled-components";

const RankFrame = styled.div`
  padding: 0px 0px 10px 10px;
  margin-bottom: 20px;
`;


function IdolKeywordRank() {
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
  const [check, setCheck] = useState<boolean[]>([true, false, false, false, false])


  return (
    <RankFrame>
      <TitleComponent blacktxt="인기" purpletxt="키워드" />
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