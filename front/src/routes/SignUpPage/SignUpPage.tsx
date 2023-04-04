import React, {useState, useCallback, useRef} from "react";
import { useLocation } from "react-router-dom"
import styled from "styled-components";
import { PurpleButton, BlueButton } from "../../components/Button";
import { NicknameInput, MessageDiv } from "../../components/SignupPage/NicknameComponents";
import { IdolGrid, IdolImage, IdolImageWrapper, IdolName, EmptySelected, Selected, SelectedSection, IdolWrapper } from "../../components/SignupPage/IdolComponents";
import { CloseButton } from "../../components/Button";
import axios from "axios";
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

// 나중에 진짜 input값 들어오면 변경 예정..
type IdolObjectType = {
  idolNum?: number;
  idolName?: string;
  idolImg?: string;
  isSelected?: boolean;
}

/** 닉네임 중복확인 클릭 시 결과값 */
type NicknameType = "EU006" | "EU009" | "success" ;

function SignUpPage() {
  const location= useLocation();
  const TOKEN = decodeURI(location.search.slice(1));  // 토큰
  const containerRef = useRef<HTMLDivElement>(null);
  let dummyData: IdolObjectType[] = [
    {
      idolNum: 1,
      idolName: "아이돌",
      idolImg: "https://t1.daumcdn.net/cfile/tistory/997F47475F1264272E",
    },
    {
      idolNum: 2,
      idolName: "아이돌2",
      idolImg:
        "http://image.kyobobook.co.kr/newimages/giftshop_new/goods/400/1365/hot1665021884875.jpg",
    },
    {
      idolNum: 3,
      idolName: "아이돌3",
      idolImg: "http://image.dongascience.com/Photo/2019/12/31e3797aedc8219a0faebb9b4a1fa72f.jpg",
    },
    {
      idolNum: 4,
      idolName: "아이돌4",
      idolImg: "https://cdn.crowdpic.net/detail-thumb/thumb_d_8750791E71E5BCEA161DE5B15A40AC39.jpg",
    },
    {
      idolNum: 5,
      idolName: "아이돌5",
      idolImg:
        "https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/yDv/image/xCjI3YKJtlp6C7kj4fn1PYv0lpY.jpg",
    },
    {
      idolNum: 6,
      idolName: "아이돌6",
      idolImg: "https://cdn.pixabay.com/photo/2018/10/04/20/04/the-stones-3724310__480.jpg",
    },
    {
      idolNum: 7,
      idolName: "아이돌7",
      idolImg:
        "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/2736722884/B.png?997000000",
    },
    {
      idolNum: 8,
      idolName: "아이돌8",
      idolImg: "http://openimage.interpark.com/goods_image_big/1/9/6/0/9472491960_l.jpg",
    },
    {
      idolNum: 9,
      idolName: "아이돌9",
      idolImg: "http://openimage.interpark.com/goods_image_big/1/9/6/0/9472491960_l.jpg",
    },
    {
      idolNum: 10,
      idolName: "아이돌10",
      idolImg: "http://openimage.interpark.com/goods_image_big/1/9/6/0/9472491960_l.jpg",
    },
    {
      idolNum: 11,
      idolName: "아이돌11",
      idolImg: "http://openimage.interpark.com/goods_image_big/1/9/6/0/9472491960_l.jpg",
    },
    {
      idolNum: 12,
      idolName: "아이돌12",
      idolImg: "http://openimage.interpark.com/goods_image_big/1/9/6/0/9472491960_l.jpg",
    },
  ];  // 더미데이터

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
          <MessageDiv isValid={nicknameCode === "success"}>
            { message }
          </MessageDiv>
        </div>
        {nicknameCode !== "success" && <PurpleButton onClick={ handleIsValidNickname } width="100px">중복 확인</PurpleButton>}
        {nicknameCode === "success" && <BlueButton onClick={() => handleChangePage(1) } width="100px">다음으로</BlueButton>}
      </InputWrapper>
    </PageWrapper>
  );

  // page 2에 대한 정보들
  const [selectedIdols, setSelectedIdols] = useState<IdolObjectType[]>([]);
  const [idols, setIdols] = useState<IdolObjectType[]>(dummyData);

  /** 내가 선택한 아이돌 팀을 보여주자 */
  const showSelectIdols = useCallback(() => {
    const returnArr = selectedIdols?.map(idol =>
      <Selected url={idol.idolImg} >
        <CloseButton onClick={()=>handleDeleteSelectedIdol(idol)}>X</CloseButton>
      </Selected>
    )
    for (let i=0; i<5-selectedIdols.length; i++) {
      returnArr.push(<EmptySelected />)
    }
    return returnArr;
  }, [selectedIdols]);

  /** 좋아하는 아이돌을 선택하자 */
  const handleSelectIdol = (idol: IdolObjectType): void => {
    if (idol.isSelected) { return }
    else if (selectedIdols.length >= 5) {
      alert("최대 5명의 아이돌만 선택할 수 있습니다");
      return
    }
    else {
      setIdols(prev => prev.map(idol2 => idol.idolNum === idol2.idolNum? {...idol2, isSelected: true} : idol2))
      setSelectedIdols(prev=> [...prev, {...idol, isSelected: true}]);
    }
  }
  /** 선택한 아이돌을 삭제하자 */
  const handleDeleteSelectedIdol = (idol:IdolObjectType): void => {
    // 원본 배열에서 false로 변경하고... 선택된 배열에서도 삭제를 하자궁...
    setIdols(prev => prev.map(idol2 => idol.idolNum === idol2.idolNum? {...idol2, isSelected: false} : idol2))
    setSelectedIdols(prev=> prev.filter(idol2 => idol.idolNum !== idol2.idolNum));
  }
  const handleSignUp = () => {
    const headers = {
      Authorization: TOKEN,
    };
    const body = {
      nickname: nickname,
      interest: selectedIdols.map(idol => idol.idolName),
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
          {idols.map((idol: IdolObjectType) => (
            <IdolImageWrapper>
              <IdolImage url={idol.idolImg} onClick={()=> idol.isSelected? handleDeleteSelectedIdol(idol) : handleSelectIdol(idol)} className={`${idol.isSelected && "selected"}`}/>
              <IdolName>{idol.idolName}</IdolName>
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