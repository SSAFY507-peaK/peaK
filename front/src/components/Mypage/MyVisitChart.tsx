import ChartComponent from "./ChartComponent";
import ChartFrameComponent from "./ChartFrameComponent";
import { ReactComponent as Icon } from "../../assets/material-symbols_timer-outline-rounded.svg"
import { Idoldata } from "../../_utils/Types";

interface Props {
  userName: string;
  userTime: Idoldata;
}

function MyVisitChart({userName, userTime}:Props) {
  return (
    <ChartFrameComponent
      score={`${userTime.myTotaldata}분`}
      title="방문 시간"
      mr="0px"
      icon={<Icon />}
      data={<ChartComponent name={"방문 시간"} idoldata={userTime} />}
    />
  )
}

export default MyVisitChart;