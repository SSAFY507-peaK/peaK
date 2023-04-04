// import styled from "styled-components";

import ChartComponent from "./ChartComponent";
import ChartFrameComponent from "./ChartFrameComponent";
import { ReactComponent as Icon } from "../../assets/material-symbols_timer-outline-rounded.svg"
import { Idoldata } from "../../_utils/Types";

interface Props {
  userName: string;
}

const idoldata:Idoldata = {
  myTotaldata: 59,
  dataLst: [ 50, 35, 36, 40, 8, 100, 98],
  dataAvg: [ 50, 49, 61, 38, 98, 100, 78]
}

function MyVisitChart({userName}:Props) {
  // const visitedTime:number = 51
  return (
    <ChartFrameComponent
      score={`${idoldata.myTotaldata}분`}
      title="방문 시간"
      mr="0px"
      icon={<Icon />}
      data={<ChartComponent idoldata={idoldata} />}
    />
  )
}

export default MyVisitChart;