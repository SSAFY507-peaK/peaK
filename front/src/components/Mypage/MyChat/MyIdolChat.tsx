import styled from "styled-components";

interface Item {
  content: string;
  datetime: string;
}

interface Props {
  item: Item;
}

const ChatFrame = styled.div`
  display: flex;
  flex-direction: column;
`;

const DateFrame = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 30px;
`;

const CommentFrame = styled.div`
  height: 11vh;
  padding: 20px;
  border-radius: 15px;
  background-color: #f6f2f8;
  box-shadow: 1px 3px 1px #cfcdcd;
`;

function MyIdolChat({item}:Props) {
  return (
    <ChatFrame>
      <DateFrame>
        {item.datetime}
      </DateFrame>
      <CommentFrame>
        {item.content}  
      </CommentFrame>
    </ChatFrame>
  
  )
}

export default MyIdolChat;