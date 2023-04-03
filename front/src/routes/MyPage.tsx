import { useEffect, useState } from 'react';

import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import MyChat from '../components/Mypage/MyChat/MyChat';
import MyChatChart from '../components/Mypage/MyChatChart';
import MyClickChart from '../components/Mypage/MyClickChart';
import MyInterest from '../components/Mypage/MyInterest';
import MyVisitChart from '../components/Mypage/MyVisitChart';
import TitleComponent from "../components/idolpage/TitleComponent";
import TotalChart from '../components/Mypage/TotalChart';
import styled from "styled-components";
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

function MyPage() {
  const params = useParams();
  const userName:string = params.userName || "";
  const [idolName, setIdolName] = useState<string>("")
  
  useEffect(() => {
    console.log(idolName)
  },[idolName])

  return (
    <Wrapper>
      <TitleFrame>
        <TitleComponent id="2" blacktxt="어서오세요, " purpletxt={userName} addtxt=" 님"></TitleComponent>
        <DriveFileRenameOutlineOutlinedIcon sx={{ fontSize: "1.2rem" }}></DriveFileRenameOutlineOutlinedIcon>
      </TitleFrame>
      <TopFrame>
        <TotalChart userName={userName} setIdolName={setIdolName} />
        {
          idolName
          ?
          <>
            <MyInterest userName={userName} idolName={idolName}/>
            <MyChat userName={userName} />
          </>
          :
          null
        }
      </TopFrame>
      {
        idolName
        ?
        <BottomFrame>
          <MyClickChart userName={userName} />
          <MyChatChart userName={userName} />
          <MyVisitChart userName={userName} />
        </BottomFrame>
        :
        null
      }
    </Wrapper>
  );
}

export default MyPage;
