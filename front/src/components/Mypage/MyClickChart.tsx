// import styled from "styled-components";
import ChartFrameComponent from "./ChartFrameComponent";
import { ReactComponent as Icon } from "../../assets/mdi_cursor-default-click-outline.svg"
import ChartComponent from "./ChartComponent";
interface Props {
  userName: string;
}


function MyClickChart({userName}:Props) {
  const clickCount:number = 73
  return (
    <ChartFrameComponent
      score={`${clickCount}회`}
      title="클릭 수"
      icon={<Icon></Icon>}
      data={<ChartComponent></ChartComponent>}
    />
  )
}

export default MyClickChart;