import React, {useState, useCallback, useRef} from "react";
import { useLocation, useLoaderData } from "react-router-dom"
import styled from "styled-components";
import { PurpleButton, BlueButton } from "../../components/Button";
import { NicknameInput, MessageDiv } from "../../components/SignupPage/NicknameComponents";
import { IdolGrid, IdolImage, IdolImageWrapper, IdolName, EmptySelected, Selected, SelectedSection, IdolWrapper } from "../../components/SignupPage/IdolComponents";
import { CloseButton } from "../../components/Button";
import axios from "axios";
import {IdolListsType} from "../../_utils/Types";


// 컴포넌트들 (추후 옮기자)
const Wrapper = styled.div`
  height: 100vh;
  overflow-y: hidden;
`;
const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 5vh 5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Description = styled.p`
  margin-top: 0;
  color: var(--gray400-color);
`
// 첫 번째 페이지
const InputWrapper = styled.div`
  display: flex;
`
// 두 번째 페이지
/** 아이돌 선택에 대한 설명을 담은 div */
const DescriptionSection = styled.div`
  flex: 1 0 350px;
  & button {
    margin-right: 15px;
  }
`

/** 닉네임 중복확인 클릭 시 결과값 */
type NicknameType = "EU006" | "EU009" | "200" ;

function SignUpPage() {
  const location= useLocation();
  const idolLists = useLoaderData() as IdolListsType;
  // console.log(idolLists)

  const TOKEN = decodeURI(location.search.slice(1));  // 토큰
  // const TOKEN = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNzM0MTU1ODM2IiwiQXV0aGVudGljYXRpb24iOnsiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfR1VFU1QifV0sImRldGFpbHMiOnsicmVtb3RlQWRkcmVzcyI6IjMuMzguOTIuMTExIiwic2Vzc2lvbklkIjoiOTQwRjBGNUMxMURFM0ZFMTVEMUI0NEVDMEE2ODUwQzgifSwiYXV0aGVudGljYXRlZCI6dHJ1ZSwicHJpbmNpcGFsIjp7ImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX0dVRVNUIn1dLCJhdHRyaWJ1dGVzIjp7ImlkIjoyNzM0MTU1ODM2LCJjb25uZWN0ZWRfYXQiOiIyMDIzLTA0LTAzVDEzOjU2OjE5WiIsImtha2FvX2FjY291bnQiOnsiaGFzX2VtYWlsIjp0cnVlLCJlbWFpbF9uZWVkc19hZ3JlZW1lbnQiOmZhbHNlLCJpc19lbWFpbF92YWxpZCI6dHJ1ZSwiaXNfZW1haWxfdmVyaWZpZWQiOnRydWUsImVtYWlsIjoicXJpOThAbmF2ZXIuY29tIn19LCJlbWFpbCI6InFyaTk4QG5hdmVyLmNvbSIsInJvbGUiOiJST0xFX0dVRVNUIiwibmFtZSI6IjI3MzQxNTU4MzYifSwiYXV0aG9yaXplZENsaWVudFJlZ2lzdHJhdGlvbklkIjoia2FrYW8iLCJjcmVkZW50aWFscyI6IiIsIm5hbWUiOiIyNzM0MTU1ODM2In0sImVtYWlsIjoicXJpOThAbmF2ZXIuY29tIiwicm9sZSI6IlJPTEVfR1VFU1QiLCJpYXQiOjE2ODA1OTEyMzgsImV4cCI6MTY4MDU5MzAzOH0.dxKlA5Zx2lnIp-TzkWykPA_FEtg3qz3CEJM7ZtkkYbUorUQqyr_xql7PP3Fdzsvu3aWDL14yROsuGRtXlKGinA"
  const containerRef = useRef<HTMLDivElement>(null);

  /** 페이지 이동 함수 */
  const handleChangePage = (page:number) => {
    containerRef.current && (
      page === 1 ?
        containerRef.current.scrollBy({
          left: 0,
          top: window.innerHeight,
          behavior: "smooth",
        }) :
        containerRef.current.scrollBy({
          left: 0,
          top: -window.innerHeight,
          behavior: "smooth",
        })
      // pageRef.current.display = none;
    )
  }


  // page 1에 대한 설정들
  const [nickname, setNickname] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [nicknameCode, setNicknameCode] = useState<NicknameType | undefined>(undefined);
  // const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;  // 닉네임 정규표현식

  /** 닉네임을 받자 */
  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNickname(e.target.value);
    setNicknameCode(undefined);
    setMessage("");
  };
  /** 닉네임 유효성을 체크하자 */
  const handleIsValidNickname = (): void => {
    axios.get(`https://j8a507.p.ssafy.io/api/user/nickname/${nickname}`, {
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

  const page1 = (
    <PageWrapper>
      <h2>닉네임 설정</h2>
      <Description>닉네임은 8글자 이하의 한글, 영어, 숫자로만 이루어져야 합니다</Description>
      <InputWrapper>
        <div>
          <NicknameInput isValid={nicknameCode} onChange={e => handleNickname(e)} value={nickname} />
          <MessageDiv isValid={nicknameCode === "200"}>
            { message }
          </MessageDiv>
        </div>
        {nicknameCode !== "200" && <PurpleButton onClick={ handleIsValidNickname } width="100px">중복 확인</PurpleButton>}
        {nicknameCode === "200" && <BlueButton onClick={() => handleChangePage(1) } width="100px">다음으로</BlueButton>}
      </InputWrapper>
    </PageWrapper>
  );

  // page 2에 대한 정보들
  const [selectedIdols, setSelectedIdols] = useState<string[]>([]);
  const [idols, setIdols] = useState<string[]>(idolLists.idols.map(idol => idol === "CLASS:y" ? "CLASSy" : idol));

  console.log(idols);
  /** 내가 선택한 아이돌 팀을 보여주자 */
  const showSelectIdols = useCallback(() => {
    const returnArr = selectedIdols?.map(idol =>
      <Selected url={`https://j8a507.p.ssafy.io/img/${idol}.webp`} >
        <CloseButton onClick={()=>handleDeleteSelectedIdol(idol)}>X</CloseButton>
      </Selected>
    )
    for (let i=0; i<5-selectedIdols.length; i++) {
      returnArr.push(<EmptySelected />)
    }
    return returnArr;
  }, [selectedIdols]);

  /** 좋아하는 아이돌을 선택하자 */
  const handleSelectIdol = (idol: string): void => {
    if (selectedIdols.length >= 5) {
      alert("최대 5명의 아이돌만 선택할 수 있습니다");
      return;
    }
    else {
      setSelectedIdols(prev => [...prev, idol]);
    }
  }
  /** 선택한 아이돌을 삭제하자 */
  const handleDeleteSelectedIdol = (idol: string): void => {
    console.log("삭제햇")
    // 선택된 배열에서 삭제를 하자궁...
    setSelectedIdols(prev=> prev.filter(selectedIdol => selectedIdol !== idol));
  }
  const handleSignUp = () => {
    const headers = {
      Authorization: TOKEN,
    };
    const body = {
      nickname: nickname,
      interest: selectedIdols,
    }
    console.log({headers, body});
    axios.post(`https://j8a507.p.ssafy.io/api/user/sign-up`, body, {
      headers: headers
    })
      .then(response => console.log(response.data))
      .catch(error => console.log(error))
  }

  const page2 = (
    <PageWrapper>
      <SelectedSection>
        <DescriptionSection>
          <h2>좋아하는 아이돌 선택</h2>
          <Description>좋아하는 아이돌을 한 팀 이상 선택해주세요. <br/>최대 다섯 팀까지 선택 가능합니다.</Description>
          <div>
            <PurpleButton width="120px" onClick={() => handleChangePage(2)}>이전으로</PurpleButton>
            <BlueButton disabled={selectedIdols.length<=0} width="120px" onClick={handleSignUp}>회원가입 완료</BlueButton>
          </div>
        </DescriptionSection>
        <IdolGrid cols={5}>{ showSelectIdols() }</IdolGrid>
      </SelectedSection>
      <h3>전체 아이돌</h3>
      <IdolWrapper>
        <IdolGrid cols={6} gap="20px">
          {idols.map((idol: string) => (
            <IdolImageWrapper>
              <IdolImage url={`https://j8a507.p.ssafy.io/img/${idol}.webp`} onClick={()=> selectedIdols.includes(idol) ? handleDeleteSelectedIdol(idol) : handleSelectIdol(idol)} className={`${selectedIdols.includes(idol) && "selected"}`}/>
              <IdolName>{idol}</IdolName>
            </IdolImageWrapper>
          ))}
        </IdolGrid>
      </IdolWrapper>
    </PageWrapper>
  );

  return (
    <Wrapper ref={containerRef}>
      { page1 }
      { page2 }
    </Wrapper>
  );
}

export default SignUpPage;