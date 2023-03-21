import styled from "styled-components";

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 5px;
  background-color: red;
`;

const ChatFrame = styled.div`

`;

const ChatInputFrame = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 0px 0px 10px;
  background-color: yellow;
`;


const Title = styled.div`
  background-color: var();
`;

const Button = styled.div`
  width: 100px;
  border-radius: 0px 0px 10px;
  background-color: var(--purple500-color);
  &:hover {
    background-color: var(--purple300-color);
  }

`;
const ChatInput = styled.input`
  width: 100%;
  background-color: black;
`;


function IdolChat() {
  return (
    <Frame>
      <Title>응원 한 마디</Title>
      <ChatFrame>여기는 댓글들이 달리는 곳</ChatFrame>
      <ChatInputFrame>      
        <ChatInput placeholder="여기는 댓글을 적는 곳"></ChatInput>
        <Button>응원 남기기</Button>
      </ChatInputFrame>
    </Frame>
  )
}

export default IdolChat;