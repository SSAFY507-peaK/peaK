// import styled from "styled-components";

import ChartComponent from "./ChartComponent";
import ChartFrameComponent from "./ChartFrameComponent";
import { ReactComponent as Icon } from "../../assets/uil_comment-heart.svg"
import { Idoldata } from "../../_utils/Types";

interface Props {
  userName: string;
}

const idoldata:Idoldata = {
  myTotaldata: 6,
  dataLst: [ 6, 5, 5, 3, 6, 7, 7],
  dataAvg: [ 6, 4, 6, 7, 5, 3, 4]
}

function MyChatChart({userName}:Props) {
  // const dayCount:number = 5
  return (
    <ChartFrameComponent
      score={`${idoldata.myTotaldata}일`}
      title="응원 댓글 참여일"
      icon={<Icon />}
      data={<ChartComponent idoldata={idoldata} />}
    />
  )
}

export default MyChatChart;