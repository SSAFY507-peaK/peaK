import { PurpleButton } from "../../Button";
import TitleComponent from "../TitleComponent";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
  box-shadow: 5px;
  padding: 15px;
  height: 100%;
`;

const ChatFrame = styled.div`
  /* width: 100%; */
  height: 25vh;
  padding-left: 15px;
  margin-bottom: 10px;
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

const ChatInputFrame = styled.div`
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
`;


function IdolChat() {
  const chat = []

  const tmp = {
    name: "사랑아럿뜰해",
    data: "와 고잉은 따라올 수가 없다. 진짜 최고인듯"
  }
  for (let i=0 ; i < 30; i++) {
    chat.push(tmp)
  }

  return (
    <Wrapper>
      <TitleComponent id="1" purpletxt="응원" blacktxt="한 마디"/>
      <ChatFrame>
        {
          chat.map((e, idx) => {
            return(
              <div key={idx}>
                <ChatTitle>{e.name}</ChatTitle>
                <ChatData>{e.data}</ChatData>
              </div>
            )
          })
        }
      </ChatFrame>
      <ChatInputFrame>      
        <ChatInput placeholder="댓글을 입력해주세요."></ChatInput>
        <PurpleButton width="100px">응원</PurpleButton>
      </ChatInputFrame>
    </Wrapper>
  )
}

export default IdolChat;