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
  margin-bottom: 10px;
`;

const CommentFrame = styled.div`
  font-family: 'Humanbumsuk';
  height: 11vh;
  padding: 20px 20px 20px 10px;
  border-radius: 15px;
  //background-color: #f6f2f8;
  //box-shadow: 1px 3px 1px #cfcdcd;
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