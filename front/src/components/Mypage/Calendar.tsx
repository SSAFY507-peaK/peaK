import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import CalendarItem from "./CalendarItem";

const CalendatFrame = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr 3fr 3fr 3fr 3fr 3fr;
  width: 100%;
  height: 30%;
  background-color: white;
  padding: 25px;
`;

function Calendar() {
  let now_month = new Date().getMonth() + 1
  let now_day = new Date().getDate()
  const [chatList, setChatList] = useState<string[]>([])
  const [sellectList, setSellectList] = useState<boolean[]>([true, false, false, false, false, false, false, false, false, false, false, false, false, false])
  const [isChat, setIsChat] = useState<boolean[]>([true, false, true, false, false, true, false, false, true, false, false, false, true, false])
  let i:number = now_day
  let tmp_lst:string[] = [] 

  for (let j = 0; j < 14; j += 1) {
    if (i === 0) {
      now_month -= 1
      if (now_month in [1, 3, 5, 7, 8, 10, 12]){
        i = 31
      } else if (now_month in [4, 6, 9, 11]) {
        i = 30
      } else {
        i = 28
        console.log(28)   // 윤년도..체크
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
    setChatList(tmp_lst)
  },[])

  console.log(sellectList)
  return (
    <div>
      <CalendatFrame>
        {
          chatList.slice(0).reverse().map((day, idx) => (
            <CalendarItem
              key={idx}
              day={day}
              idx={idx}
              // setSellect={setSellect}
              setSellectList={setSellectList}
              isChat={isChat}
              sellectList={sellectList}
              ></CalendarItem>
              ))
        }
        {/* {chatList[13-sellect]} */}
      </CalendatFrame>
    </div>
  )
}

export default Calendar;