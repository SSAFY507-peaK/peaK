import { MouseEvent, useEffect, useState } from 'react';

import { CreateMyInterest } from '../_store/slices/InterestSlice';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import MyChat from '../components/Mypage/MyChat/MyChat';
import MyChatChart from '../components/Mypage/MyChatChart';
import MyClickChart from '../components/Mypage/MyClickChart';
import MyInterest from '../components/Mypage/MyInterest';
import MyVisitChart from '../components/Mypage/MyVisitChart';
import TitleComponent from "../components/idolpage/TitleComponent";
import TotalChart from '../components/Mypage/TotalChart';
import sampleData from "../components/Mypage/sampleData.json"
import styled from "styled-components";
import { useAppDispatch } from '../_hooks/hooks';
import { useParams } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleFrame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  flex: 0.1;
  margin-bottom: 25px;
`;

const TopFrame = styled.div`
  display: flex;
  flex-direction: row;
  flex: 0.4;
  margin-bottom: 25px;
`;

const BottomFrame = styled.div`
  display: flex;
  flex-direction: row;
  /* flex: 0.4; */
`;


/** 클릭시 닉네임 변경 모달창과 함께 닉네임 변경  */
function handleClick(event: MouseEvent<SVGSVGElement>) {
  console.log('닉네임 변경 구현할 예정');
}


function MyPage() {
  const params = useParams();
  const userName:string = params.userName || "";
  const [idolName, setIdolName] = useState<string>("")
  const [index, setIndex] = useState<number>(0)
  const [idolScoreData, setIdolScoreData] = useState<number[]>([0, 0])
  const dispatch = useAppDispatch()

  // 스토어에 데이터 저장
  dispatch(CreateMyInterest(sampleData))

  // 선택된 아이돌의 index 구하기
  useEffect(() => {
    const newIndex = sampleData.findIndex((item) => item.idol === idolName)
    setIndex(newIndex)
  },[idolName])
  
  // 선택된 아이돌의 점수 저장
  useEffect(() => {
    if (index >= 0) { // index 값이 올바른지 확인
      setIdolScoreData([sampleData[index].interestScore, sampleData[index].interestAverage])
    }
  }, [index])

  return (
    <Wrapper>
      <TitleFrame>
        <TitleComponent id="2" blacktxt="어서오세요, " purpletxt={userName} addtxt=" 님" />
        <DriveFileRenameOutlineOutlinedIcon sx={{ fontSize: "1.2rem", cursor: "pointer" }} onClick={handleClick} />
      </TitleFrame>
      <TopFrame>
        <TotalChart userName={userName} setIdolName={setIdolName} />
        {
          idolName && index > -1
          ?
          <>
            <MyInterest userName={userName} idolName={idolName} idolScoreData={idolScoreData} />
            <MyChat userName={userName} idolChatData={sampleData[index].comments}/>
          </>
          :
          null
        }
      </TopFrame>
      {
        idolName
        ?
        <BottomFrame>
          <MyClickChart userName={userName} userClick={sampleData[index].click}/>
          <MyChatChart userName={userName} userChat={sampleData[index].chat}/>
          <MyVisitChart userName={userName} userTime={sampleData[index].time}/>
        </BottomFrame>
        :
        null
      }
    </Wrapper>
  );
}

export default MyPage;
