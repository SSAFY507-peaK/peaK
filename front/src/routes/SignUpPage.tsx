import React, { useState } from "react";
import styled from "styled-components"
import {PurpleButton, RedButton} from "../components/Button";

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const NicknameInput = styled.input`
  //background-color: white;
  padding: 10px;
  width: 300px;
  border-bottom: 1px solid var(--gray100-color);
  margin-bottom: 5px;
`

const DuplicateDiv = styled.div<{ isUnique: boolean | undefined }>`
  font-size: 13px;
  margin-bottom: 15px;
  color: ${props => props.isUnique? "blue" : props.isUnique === false? "red" : "black"};
`

const IdolGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
`
const SelectedIdol = styled.div`
  width: 150px;
  height: 150px;
  background-color: black;
  border-radius: 50%;
`

function SignUpPage() {
  const [nickname, setNickname] = useState<string>("");
  const [isUnique, setIsUnique] = useState<boolean | undefined>();
  const [pageIdx, setPageIdx] = useState<number>(1);

  const [selectedIdol, setSelectedIdol] = useState<number[]>([-1, -1, -1, -1, -1]);
  // const [countSelected, setCountSelected] = useState<number>(0);

  const handleNickname = (e:React.ChangeEvent<HTMLInputElement>): void => {
    setNickname(e.target.value);
  }
  const handleCheckUnique = ():void => {
    setIsUnique(true);
  }

  const page1 = <>
    <h2>닉네임 설정</h2>
    <NicknameInput onChange={(e)=>handleNickname(e)} value={nickname}/>
    <DuplicateDiv isUnique={isUnique}>{isUnique? "사용 가능한 닉네임입니다" : isUnique === false? "이미 사용중인 닉네임입니다" : " "}</DuplicateDiv>
    { !isUnique && <PurpleButton onClick={handleCheckUnique}>중복 확인</PurpleButton> }
    { isUnique && <PurpleButton onClick={() => setPageIdx(2)}>다음으로</PurpleButton> }
  </>
  const page2 = <>
    <h2>좋아하는 아이돌 선택</h2>
    <div>좋아하는 아이돌은 최소 한명에서 최대 다섯 명을 선택할 수 있습니다.</div>
    <h3>선택한 아이돌</h3>
    <IdolGrid>
      {selectedIdol.map(() => {
        return <SelectedIdol/>
      })}
    </IdolGrid>
    <PurpleButton onClick={() => setPageIdx(1)}>이전으로</PurpleButton><RedButton>회원가입 완료</RedButton>
    <h3>전체 아이돌</h3>
  </>

  return (
    <PageWrapper>
      { pageIdx === 1? page2 : page1 }
      {/*<h2>닉네임 설정</h2>*/}
      {/*<NicknameInput onChange={(e)=>handleNickname(e)} value={nickname}/>*/}
      {/*<DuplicateDiv isUnique={isUnique}>{isUnique? "사용 가능한 닉네임입니다" : isUnique === false? "이미 사용중인 닉네임입니다" : " "}</DuplicateDiv>*/}
      {/*{ !isUnique && <PurpleButton onClick={handleCheckUnique}>중복 확인</PurpleButton> }*/}
      {/*{ isUnique && <PurpleButton>다음으로</PurpleButton> }*/}
    </PageWrapper>
  );
}

export default SignUpPage;
