import { Comment, UserInfo } from "../../../_utils/Types";
import { useState } from "react";

import { ClickTracker } from "../../../_utils/UserTracker";
import { PurpleButton } from "../../Button";
import TitleComponent from "../TitleComponent";
import { request } from "../../../_utils/axios";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../_hooks/hooks";
import { useParams } from "react-router";
import { CreateIdolChat } from "../../../_store/slices/IdolDetailChatSlice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
  box-shadow: 5px;
  padding: 20px;
  height: 100%;
`;

const ChatFrame = styled.div`
  height: 25vh;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 20px;
  overflow-y: auto;

  // 스크롤바 관련 설정
  &::-webkit-scrollbar {
    width: 3px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.8);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: var(--gray700-color);
  }
`;
const ChatTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  padding-bottom: 3px;
`;

const ChatData = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
  margin-bottom: 10px;
`;

const ChatInputFrame = styled.form`
  display: flex;
  flex-direction: row;
  padding-left: 10px;
`;

const ChatInput = styled.input`
  width: 100%;
  height: 33px;
  background-color: white;
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  margin-right: 5px;
  padding-left: 10px;
`;


function IdolChat() {
  const params = useParams();
  const idolName:string = params.idolName || "";
  const [todayComment, setTodayComment] = useState<string>("")
  const userInfo:UserInfo = useAppSelector(state => state.userInfo)
  const userId:string = useAppSelector(state => state.userInfo.userId)
    // // 아이돌 채팅 목록 가자오기
  const comments:Comment[] = useAppSelector(state => state.idolDetailChat.comments)
  const dispatch = useAppDispatch()

  // 아이돌 입력 채팅 등록
  const handleSubmit = async (e:any) => {
    e.preventDefault()

    const data = {content: todayComment} 
    const headers = {Authorization:userInfo.TOKEN }

    request("post", `/user/comment/${idolName}`, data, headers)
      .then(res => {
        console.log(res)
        if (res){
          alert(res.message)
          request("get", `/idol/${idolName}/comment`).then(res => dispatch(CreateIdolChat(res)))
        }
        else {
          alert("응원은 하루에 한 번! 내일 또 봐요😉")
        }
      })
      .catch(err => console.log(err))

    ClickTracker(idolName, userId)
    setTodayComment("")
  }
  
  return (
    <Wrapper>
      <TitleComponent id="1" purpletxt="응원" blacktxt="한 마디"/>
      <ChatFrame>
        {
          comments.map((e, idx) => {
            return(
              <div key={idx}>
                <ChatTitle>{e.nickname}</ChatTitle>
                <ChatData>{e.content}</ChatData>
              </div>
            )
          })
        }
      </ChatFrame>
      <ChatInputFrame onSubmit={handleSubmit}>      
        <ChatInput 
          placeholder="댓글을 입력해주세요." 
          value={todayComment}
          onChange={e => setTodayComment(e.target.value)} />
        <PurpleButton width="100px" >응원</PurpleButton>
      </ChatInputFrame>
    </Wrapper>
  )
}

export default IdolChat;