import {BlueButton, GrayButton, PurpleButton} from "../components/Button";
import {MessageDiv, NicknameInput} from "../components/SignUpPage/NicknameComponents";
import React, { useEffect, useState } from 'react';
import {useAppDispatch, useAppSelector} from '../_hooks/hooks';
import {useNavigate, useParams} from "react-router-dom";

import { CreateMyInterest } from '../_store/slices/InterestSlice';
import {CreateNickname} from "../_store/slices/UserSlice";
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import {InputWrapper} from "../components/SignUpPage/SignUpComponents";
import MyChat from '../components/Mypage/MyChat/MyChat';
import MyChatChart from '../components/Mypage/MyChatChart';
import MyClickChart from '../components/Mypage/MyClickChart';
import MyInterest from '../components/Mypage/MyInterest';
import MyVisitChart from '../components/Mypage/MyVisitChart';
import TitleComponent from "../components/IdolPage/TitleComponent";
import TotalChart from '../components/Mypage/TotalChart';
import axios from "axios";
import sampleData from "../components/Mypage/sampleData.json"
import styled from "styled-components";

// import {useSelector} from "react-redux";

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



const BASE_URL = process.env.REACT_APP_BASE_URL;
type NicknameType = "EU006" | "EU009" | "200" ;

function MyPage() {
  const params = useParams();
  const userName: string = params.userName || "";
  const [idolName, setIdolName] = useState<string>(sampleData[0].idol);
  const [index, setIndex] = useState<number>(0);
  const [idolScoreData, setIdolScoreData] = useState<number[]>([0, 0]);
  const dispatch = useAppDispatch()



  // 스토어에 데이터 저장
  dispatch(CreateMyInterest(sampleData))

  // 선택된 아이돌의 index 구하기
  useEffect(() => {
    const newIndex = sampleData.findIndex((item) => item.idol === idolName)
    if (newIndex === -1) {
      setIndex(0)
    } else {
      setIndex(newIndex)
    }
  },[idolName])


  // 선택된 아이돌의 점수 저장
  useEffect(() => {
    if (index >= 0) { // index 값이 올바른지 확인
      setIdolScoreData([sampleData[index].interestScore, sampleData[index].interestAverage])
    }
  }, [index]);

  // 닉네임 수정 관련 모음집
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [nicknameCode, setNicknameCode] = useState<NicknameType | undefined>(undefined);
  const TOKEN = useAppSelector(state => state.userInfo.TOKEN);
  const navigate = useNavigate();
  /** 닉네임 수정하기 */
  const handleEditNickname = () => {
    setIsEditing(true);
  }
  /** 닉네임 입력받기 */
  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNickname(e.target.value);
    setNicknameCode(undefined);
    setMessage("");
  };
  /** 닉네임 중복확인 */
  const handleIsValidNickname = (): void => {
    axios.get(`${BASE_URL}/api/user/nickname/${nickname}`, {
      headers: {
        Authorization: TOKEN
      }
    })
      .then(response => {
        console.log(response.data)
        const CODE = response.data.code;
        const MESSAGE = response.data.message;
        setNicknameCode(CODE);
        setMessage(MESSAGE);
      })
      .catch(error => {
        console.log(error);
        const CODE = error.response.data.code;
        const MESSAGE = error.response.data.message;
        setNicknameCode(CODE);
        setMessage(MESSAGE);
      })
  };
  /** 닉네임 변경하기 */
  const handleSaveNickname = () => {

    axios.put(`${BASE_URL}/api/user/nickname/${nickname}`, {}, {
      headers: {
        Authorization: TOKEN
      }
    })
      .then(() => {
        dispatch(CreateNickname(nickname));
        setNickname("")
        setMessage("");
        setNicknameCode(undefined);
        setIsEditing(false);
        navigate(`../mypage/${nickname}`, {replace: true})
      })
      .catch(error => {
        console.log(error);
      })
  }
  /** 닉네임 변경 취소 */
  const handleCancelEditNickname = () => {
    setNickname("");
    setMessage("");
    setNicknameCode(undefined);
    setIsEditing(false);
  }

  const Title = <>
      <TitleComponent id="2" blacktxt="어서오세요, " purpletxt={userName} addtxt=" 님" />
      <DriveFileRenameOutlineOutlinedIcon sx={{ fontSize: "1.2rem", cursor: "pointer" }} onClick={handleEditNickname} />
    </>
  const EditNickname =
    <InputWrapper>
      <div>
        <NicknameInput isValid={nicknameCode} onChange={e => handleNickname(e)} value={nickname} />
        <MessageDiv isValid={nicknameCode === "200"}>
          { message }
        </MessageDiv>
      </div>
      <GrayButton width="100px" onClick={ handleCancelEditNickname }>이전으로</GrayButton>
      {nicknameCode !== "200" && <PurpleButton onClick={ handleIsValidNickname } width="100px">중복 확인</PurpleButton>}
      {nicknameCode === "200" && <BlueButton onClick={ handleSaveNickname } width="100px">변경하기</BlueButton>}
    </InputWrapper>

  return (
    <Wrapper>
      <TitleFrame>
        { isEditing ? EditNickname : Title }
      </TitleFrame>
      {
        index > -1
        ?
        <>
        <TopFrame>
          <TotalChart userName={userName} setIdolName={setIdolName} />
          <MyInterest userName={userName} idolName={idolName} idolScoreData={idolScoreData} />
          <MyChat userName={userName} idolChatData={sampleData[index].comments}/>
        </TopFrame>
        <BottomFrame>
          <MyClickChart userName={userName} userClick={sampleData[index].click}/>
          <MyChatChart userName={userName} userChat={sampleData[index].chat}/>
          <MyVisitChart userName={userName} userTime={sampleData[index].time}/>
        </BottomFrame>
        </>
        : null
      }
    </Wrapper>
  );
}

export default MyPage;
