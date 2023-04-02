import TitleComponent from "../idolpage/TitleComponent";
import styled from "styled-components";
import MyIdolChat from "./MyIdolChat";
import Calendar from "./Calendar";

interface Props {
  userName: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.2;
  width: 100%;

`;

const ChatFrame = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 20px;

`;

export default function MyChat({userName}:Props) {
  return (
    <Wrapper>
      <TitleComponent blacktxt="나의" purpletxt="응원 댓글" />
      <ChatFrame>
        <Calendar />
        <MyIdolChat />
      </ChatFrame>
    </Wrapper>
  )
}
