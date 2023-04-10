// import styled from "styled-components";

import ChartComponent from "./ChartComponent";
import ChartFrameComponent from "./ChartFrameComponent";
import { ReactComponent as Icon } from "../../assets/mdi_cursor-default-click-outline.svg"
import { Idoldata } from "../../_utils/Types";

interface Props {
  userName: string;
  userClick: Idoldata;
}

function MyClickChart({userName, userClick}:Props) {
  return (
    <ChartFrameComponent
      score={`${userClick.myTotaldata}회`}
      title="클릭 수"
      icon={<Icon />}
      data={<ChartComponent name={"클릭 수"} idoldata={userClick} />}
    />
  )
}

export default MyClickChart;