// import styled from "styled-components";

import ChartComponent from "./ChartComponent";
import ChartFrameComponent from "./ChartFrameComponent";
import { ReactComponent as Icon } from "../../assets/material-symbols_timer-outline-rounded.svg"
import { Idoldata } from "../../_utils/Types";

interface Props {
  userName: string;
  userTime: Idoldata;
}

function MyVisitChart({userName, userTime}:Props) {
  // const visitedTime:number = 51
  return (
    <ChartFrameComponent
      score={`${userTime.myTotaldata}분`}
      title="방문 시간"
      mr="0px"
      icon={<Icon />}
      data={<ChartComponent idoldata={userTime} />}
    />
  )
}

export default MyVisitChart;