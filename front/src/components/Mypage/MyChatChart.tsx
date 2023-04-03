// import styled from "styled-components";
import ChartFrameComponent from "./ChartFrameComponent";
import { ReactComponent as Icon } from "../../assets/uil_comment-heart.svg"
import ChartComponent from "./ChartComponent";

interface Props {
  userName: string;
}


function MyChatChart({userName}:Props) {
  const dayCount:number = 5
  return (
    <ChartFrameComponent
      score={`${dayCount}일`}
      title="응원 댓글 참여일"
      icon={<Icon></Icon>}
      data={<ChartComponent></ChartComponent>}
    />
  )
}

export default MyChatChart;