import { useEffect, useState } from "react";

import Calendar from "./Calendar";
import MyIdolChat from "./MyIdolChat";
import TitleComponent from "../../idolpage/TitleComponent";
import styled from "styled-components";

interface Props {
  userName: string;
}

interface Item {
  content: string;
  datetime: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.27;
  width: 100%;
`;

const ChatFrame = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 20px;
  padding: 30px;
  height: 100%;
`;

// 데이터 들어오면 여기서 데이터를 받아와서 Store에 저장하거나 Props 할 예정!

/*
  {
    comments:[
      {
        content: "세븐틴 사랑ㅎ래",
        datetime: "2022-12-23"
      },
      {
        content: "세븐틴 사랑ㅎ래",
        datetime: "2022-12-23"
      },
    ]
  }
*/

// comments라는 데이터를 불러와서 [false, Object, false, false, ...] 이런식으로 정제해 놓고
// clickIndex를 받아서 detail = comments[clickIndex]로 detail 할당
// detail에는 content와 datetime이 담겨있어 
// detail을 MyIdolChat으로 보내주자!

const comments = [
  {
    content: "세븐틴 사랑ㅎ래",
    datetime: "2023-03-20"
  }, 
  false, 
  {
    content: "세븐틴 사랑ㅎ래2",
    datetime: "2023-03-22"
  }, 
  false, 
  false, 
  {
    content: "세븐틴 사랑ㅎ래3",
    datetime: "2023-13-25"
  },
  false, 
  false, 
  {
    content: "세븐틴 사랑ㅎ래",
    datetime: "2023-03-28"
  }, 
  false, 
  false, 
  false, 
  {
    content: "와 고잉은 따라올 수가 없다. 진짜 최고인듯",
    datetime: "2022-04-02"
  }, 
  false
]

function MyChat({userName}:Props) {
  const [clickIndex, setClickIndex] = useState<number>(0)     // 사실 이 부분도 여기서 바로 댓글 내용을 props로 내려줘도 됨!
  const [item, setItem] = useState<Item | null>(null);
  
  useEffect(() => {
    setItem(comments[clickIndex] as Item);
  },[clickIndex])

  return (
    <Wrapper>
      <TitleComponent blacktxt="나의" purpletxt="응원 댓글" />
      <ChatFrame>
        <Calendar setClickIndex={setClickIndex}/>
        {item && <MyIdolChat item={item}/>}
      </ChatFrame>
    </Wrapper>
  )
}

export default MyChat;
