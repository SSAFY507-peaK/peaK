import styled from "styled-components";

interface Props {
  day: string;
  idx: number;
  children?: React.ReactNode;
  setSellectList: React.Dispatch<React.SetStateAction<boolean[]>>;
  sellectList: boolean[];
  isChat: boolean[];
}

interface Type {
  click: boolean;
  data: boolean;
  disabled: boolean;
}

const DayComponent = styled.option<Type>`
  display: flex;
  justify-content: center;
  align-items: center;  
  margin: 5px;
  font-size: 1.1rem;
  /* height: 2vh; */
  cursor: ${props => props.data ? "pointer" : null};
  text-decoration: underline;
  color: ${props => props.click ? "white" : props => props.data ?  `var(--purple400-color)` : null};
  background-color: ${props => props.click ? `var(--purple400-color)` : "white"};
  opacity: ${props => props.data ? null : 0.5};
  border-radius: 5px;
`;


function CalendarItem({idx, day, children, sellectList, isChat, setSellectList}:Props) {
  
  return (
    <DayComponent
      onClick={() => {
        // setSellect(idx)
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