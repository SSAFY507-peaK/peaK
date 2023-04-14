import ChartComponent from "./ChartComponent";
import ChartFrameComponent from "./ChartFrameComponent";
import { ReactComponent as Icon } from "../../assets/uil_comment-heart.svg"
import { Idoldata } from "../../_utils/Types";

interface Props {
  userName: string;
  userChat: Idoldata;
}

function MyChatChart({userName, userChat}:Props) {
  return (
    <ChartFrameComponent
      score={`${userChat.myTotaldata}일`}
      title="응원 댓글 참여일"
      icon={<Icon />}
      data={<ChartComponent name={"댓글 수"} idoldata={userChat} />}
      
    />
  )
}

export default MyChatChart;