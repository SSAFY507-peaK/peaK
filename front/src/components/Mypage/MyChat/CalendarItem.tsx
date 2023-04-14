import { Comment } from "../../../_utils/Types";
import styled from "styled-components";
import { useEffect } from "react";

interface Props {
  day: string;
  idx: number;
  children?: React.ReactNode;
  setSellectList: React.Dispatch<React.SetStateAction<boolean[]>>;
  sellectList: boolean[];
  isChat: Array<Comment | boolean>;
}

interface Type {
  click: boolean;
  data: Comment | boolean;
  disabled: boolean;
}

const DayComponent = styled.option<Type>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
  padding:10px 5px;
  margin: 5px;
  font-size: 1rem;
  cursor: ${props => props.data ? "pointer" : null};
  color: ${props => props.click ? "white" : props => props.data ?  `var(--purple400-color)` : null};
  background: ${props => props.click ? `linear-gradient(to bottom right, #A869CD 0%, #76349D 100%)` : "white"};
  opacity: ${props => props.data ? null : 0.5};
  border-radius: 5px;
`;


function CalendarItem({idx, day, children, sellectList, isChat, setSellectList}:Props) {
  
  useEffect(() => {
    for (let i = 0; i<14; i++) {
      if (isChat[i]) {
        let tmpList = [false, false, false, false, false, false, false, false, false, false, false, false, false, false]
        tmpList[i] = true
        setSellectList(tmpList)
      }
    }
  },[isChat])
  return (
    <DayComponent
      onClick={() => {
        let checkList:boolean[] = [false, false, false, false, false, false, false, false, false, false, false, false, false, false]
        checkList[idx] = true
        setSellectList(checkList)
      }}
      click={sellectList[idx]}
      data={isChat[idx]}
      disabled={!isChat[idx]}
    >
      {day}
    </DayComponent>
  )
}

export default CalendarItem