import { useEffect, useState } from "react";

import CalendarItem from "./CalendarItem";
import { Comment } from "../../../_utils/Types";
import styled from "styled-components";

interface Props {
  setClickIndex: React.Dispatch<React.SetStateAction<number>>;
  idolChatData: Array<Comment | boolean>;
}

const CalendartFrame = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr 2fr 2fr 2fr;
  width: 100%;
  height: 30%;
  background-color: white;
  margin-bottom: 40px;
  margin-top: 20px;
`;

function Calendar({setClickIndex, idolChatData}:Props) {
  let now_month = new Date().getMonth() + 1
  let now_day = new Date().getDate()
  const [dayList, setDayList] = useState<string[]>([])
  const [sellectList, setSellectList] = useState<boolean[]>([true, false, false, false, false, false, false, false, false, false, false, false, false, false])
  
  let tmp_lst:string[] = [] 
  for (let j = 0, i = now_day; j < 14; j += 1) {
    if (i === 0) {
      now_month -= 1
      if (now_month in [1, 3, 5, 7, 8, 10, 12]){
        i = 31
      } else if (now_month in [4, 6, 9, 11]) {
        i = 30
      } else {
        i = 28
        // console.log(28)   // 윤년도..체크 (보류)
      }
    } 
    if (i < 10) {
      let chk:string = `0${i}`
      tmp_lst.push(chk)
    } else {
      tmp_lst.push(String(i))
    }
    i -= 1
  }

  useEffect(() => {
    setDayList(tmp_lst)
    for (let i=0; i<14; i++){
      if (sellectList[i]){
        setClickIndex(i)
      }
    }
  },[sellectList])

  return (
    <div>
      <CalendartFrame>
        {
          dayList.slice(0).reverse().map((day, idx) => (
            <CalendarItem
              key={idx}
              day={day}
              idx={idx}
              setSellectList={setSellectList}
              isChat={idolChatData}
              sellectList={sellectList}
              ></CalendarItem>
              ))
        }
      </CalendartFrame>
    </div>
  )
}

export default Calendar;


