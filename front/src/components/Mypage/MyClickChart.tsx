// import styled from "styled-components";

import ChartComponent from "./ChartComponent";
import ChartFrameComponent from "./ChartFrameComponent";
import { ReactComponent as Icon } from "../../assets/mdi_cursor-default-click-outline.svg"
import { Idoldata } from "../../_utils/Types";

interface Props {
  userName: string;
}

const idoldata:Idoldata = {
  myTotaldata: 87,
  dataLst: [ 30, 45, 66, 11, 98, 100, 53],
  dataAvg: [ 60, 43, 6, 47, 98, 100, 78]
}

function MyClickChart({userName}:Props) {
  return (
    <ChartFrameComponent
      score={`${idoldata.myTotaldata}회`}
      title="클릭 수"
      icon={<Icon />}
      data={<ChartComponent idoldata={idoldata} />}
    />
  )
}

export default MyClickChart;