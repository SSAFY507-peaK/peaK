import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { PurpleButton, RedButton } from "../components/Button";
import { NicknameInput, MessageDiv } from "../components/SignupPage/NicknameComponents";
import { IdolGrid, IdolImage, IdolImageWrapper, IdolName, EmptySelected, Selected } from "../components/SignupPage/IdolComponents";

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 5vh 5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const InputWrapper = styled.div`
  display: flex;
  
`
const SelectedSection = styled.div`
  display: flex;
`
const IdolWrapper = styled.div`
  overflow-y: scroll;
  padding: 15px;
  &::-webkit-scrollbar {
    width: 7px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.8);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: var(--gray700-color);
  }
`
const Description = styled.p`
  margin-top: 0;
  color: var(--gray400-color);
`
const CloseButton = styled.button`
  height: 20px;
  width: 20px;
  border-radius: 15px;
  color: white;
  background-color: var(--gray700-color);
  
  position: absolute;
  top: 0;
  right: 0;
`


type IdolObjectType = {
  idolNum?: number;
  idolName?: string;
  idolImg?: string;
  isSelected?: boolean;
}
type NicknameType = "long" | "character" | "duplicate" | "ok";

function SignUpPage() {

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
  const [pageIdx, setPageIdx] = useState<number>(1);  // 페이지 기억하기

  // page 1에 대한 설정들
  const [nickname, setNickname] = useState<string>("");
  const [isValidNickname, setIsValidNickname] = useState<NicknameType | undefined>(undefined);
  const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;  // 닉네임 정규표현식

  /** 닉네임을 받자 */
  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNickname(e.target.value);
    setIsValidNickname(undefined);
  };
  /** 닉네임 유효성을 체크하자 */
  const handleIsValidNickname = (): void => {
    if (nickname.length > 8) {
      setIsValidNickname("long")
    }
    else if (!regex.test(nickname)) {
      setIsValidNickname("character");
    }
    // 여기서 유효성 체크를 하고 온 결과에 따라 "ok"와 "duplicate"로 나눠야함
    else {
      setIsValidNickname("ok");
    }
  };
  /** 닉네임 유효성에 대한 메시지를 보여주자 */
  const nicknameMessage = () => {
    switch (isValidNickname) {
      case "long":
        return "닉네임은 8자 이하여야 합니다."
      case 'character' :
        return "닉네임은 한글, 영어, 숫자로만 이루어져야 합니다."
      case "duplicate" :
        return "중복된 닉네임입니다."
      case "ok" :
        return "사용 가능한 닉네임입니다."
      default :
        return ""
    }
  }

  const page1 = (
    <>
      <h2>닉네임 설정</h2>
      <Description>닉네임은 8글자 이하의 한글, 영어, 숫자로만 이루어져야 합니다</Description>

      <InputWrapper>
        <div>
          <NicknameInput isValid={isValidNickname} onChange={e => handleNickname(e)} value={nickname} />
          <MessageDiv isValid={isValidNickname === "ok"}>
            { nicknameMessage() }
          </MessageDiv>
        </div>
        {isValidNickname !== "ok" && <PurpleButton onClick={handleIsValidNickname} width="100px">중복 확인</PurpleButton>}
        {isValidNickname === "ok" && <PurpleButton onClick={() => setPageIdx(2) } width="100px">다음으로</PurpleButton>}
      </InputWrapper>
    </>
  );


  // page 2에 대한 정보들
  const [selectedIdols, setSelectedIdols] = useState<IdolObjectType[]>([]);
  const [idols, setIdols] = useState<IdolObjectType[]>(dummyData);

  /** 내가 선택한 아이돌 팀을 보여주자 */
  const showSelectIdols = useCallback(() => {
    const returnArr = selectedIdols?.map(idol =>
      <Selected url={idol.idolImg} >
        <CloseButton onClick={(e)=>handleDeleteSelectedIdol(e, idol)}>X</CloseButton>
      </Selected>
    )
    for (let i=0; i<5-selectedIdols.length; i++) {
      returnArr.push(<EmptySelected />)
    }
    return returnArr;
  }, [selectedIdols]);

  /** 좋아하는 아이돌을 선택하자 */
  const handleSelectIdol = (idol: IdolObjectType): void => {
    if (selectedIdols.length >= 5) {
      alert("최대 5명의 아이돌만 선택할 수 있습니다");
      return
    }
    if(idol?.isSelected){ return }
    else {
      setIdols(prev => prev.map(idol2 => idol.idolNum === idol2.idolNum? {...idol2, isSelected: true} : idol2))
      setSelectedIdols(prev=> [...prev, {...idol, isSelected: true}]);
    }
  }
  /** 선택한 아이돌을 삭제하자 */
  const handleDeleteSelectedIdol = (e:any, idol:IdolObjectType): void => {
    // 원본 배열에서 false로 변경하고... 선택된 배열에서도 삭제를 하자궁...
    setIdols((prev): IdolObjectType[] => prev.map((idol2): IdolObjectType => idol.idolNum === idol2.idolNum? {...idol2, isSelected: false} : idol2))
    setSelectedIdols(prev=> prev.filter(idol2 => idol.idolNum !== idol2.idolNum));
  }

  const page2 = (
    <>
      <SelectedSection>
        <div style={{flex: "1", marginRight: "30px"}}>
          <h2>좋아하는 아이돌 선택</h2>
          <div>좋아하는 아이돌은 최소 한명에서 최대 다섯 명을 선택할 수 있습니다.</div>
          <div>
            <PurpleButton height="30px" width="150px" onClick={() => setPageIdx(1)}>이전으로</PurpleButton>
            <RedButton disabled={selectedIdols.length<=0} height="30px" width="150px">회원가입 완료</RedButton>
          </div>
        </div>
        <IdolGrid cols={5}>{ showSelectIdols() }</IdolGrid>
      </SelectedSection>
      <h3>전체 아이돌</h3>
      <IdolWrapper>
        <IdolGrid cols={6}>
          {idols.map((idol: IdolObjectType) => (
            <IdolImageWrapper >
              <IdolImage url={idol.idolImg} onClick={()=>handleSelectIdol(idol)}/>
              <IdolName>{idol.idolName}</IdolName>
            </IdolImageWrapper>
          ))}
        </IdolGrid>
      </IdolWrapper>
    </>
  );

  return (
    <PageWrapper>
      {/*{ page2 }*/}
      {pageIdx === 1 ? page1 : page2}
    </PageWrapper>
  );
}

export default SignUpPage;