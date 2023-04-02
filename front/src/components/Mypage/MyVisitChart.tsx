// import styled from "styled-components";
import ChartFrameComponent from "./ChartFrameComponent";
import { ReactComponent as Icon } from "../../assets/material-symbols_timer-outline-rounded.svg"
import ChartComponent from "./ChartComponent";

interface Props {
  userName: string;
}

function MyVisitChart({userName}:Props) {
  const visitedTime:number = 51
  return (
    <ChartFrameComponent
      score={`${visitedTime}분`}
      title="방문 시간"
      mr="0px"
      icon={<Icon></Icon>}
      data={<ChartComponent></ChartComponent>}
    />
  )
}

export default MyVisitChart;