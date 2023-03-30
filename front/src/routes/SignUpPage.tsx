import React, { useState } from "react";
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

function SignUpPage() {
  const idols = [
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
  ];

  const [nickname, setNickname] = useState<string>("");
  const [isUnique, setIsUnique] = useState<boolean | undefined>();
  const [pageIdx, setPageIdx] = useState<number>(1);

  const [selectedIdol, setSelectedIdol] = useState<number[]>([-1, -1, -1, -1, -1]);
  // const [countSelected, setCountSelected] = useState<number>(2);
  const [selectedIdols, setSelectedIdols] = useState<Object[]>([]);
  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNickname(e.target.value);
  };
  const handleCheckUnique = (): void => {
    setIsUnique(true);
  };

  const handleSelectIdol = (e:any, idol:object): void => {
    let classList = e.target.classList;

    // selected라는 클래스가 있으면 선택된 것이므로 무시하자
    if (classList.contains('selected')) {
      // console.log('선택됐떤 div입니다');
      // setSelectedIdols(prev => prev.filter(i => i.idolNum !== idol.idolNum));
      // e.target.classList.remove('selected');
      // console.log(selectedIdols);
    }
    // 선택되지 않았던 것이면 클래스를 추가하고 state로 관리하기..
    else {
      e.target.classList.add('selected');
      console.log(e);
      setSelectedIdols(prev => [...prev, idol]);
    }
  }
  const handleDeleteSelectedIdol = (e:any, idol:object): void => {
    // let classList = e.target.parent.classList;
    console.log(e);

    // selected라는 클래스가 있으면 선택된 것이므로 삭제하자....... 클래스돟 지우기!

    setSelectedIdols(prev => prev.filter(i => i.idolNum !== idol.idolNum));
    e.target.parentElement.classList.remove('selected');
    console.log(selectedIdols);

  }

  const page1 = (
    <>
      <h2>닉네임 설정</h2>
      <NicknameInput onChange={e => handleNickname(e)} value={nickname} />
      <MessageDiv isUnique={isUnique}>
        {isUnique ?
          "사용 가능한 닉네임입니다"
          : isUnique === false ?
            "이미 사용중인 닉네임입니다"
            : " "}
      </MessageDiv>
      {!isUnique && <PurpleButton onClick={handleCheckUnique}>중복 확인</PurpleButton>}
      {isUnique && <PurpleButton onClick={() => setPageIdx(2)}>다음으로</PurpleButton>}
    </>
  );
  const page2 = (
    <>
      <SelectedSection>
        <div style={{flex: "1", marginRight: "30px"}}>
          <h2>좋아하는 아이돌 선택</h2>
          <div>좋아하는 아이돌은 최소 한명에서 최대 다섯 명을 선택할 수 있습니다.</div>
          <div>
            <PurpleButton height="30px" width="150px" onClick={() => setPageIdx(1)}>이전으로</PurpleButton>
            <RedButton height="30px" width="150px">회원가입 완료</RedButton>
          </div>
        </div>
        <IdolGrid cols={5}>
          {selectedIdols?.map(idol => {
            return <Selected>
              <CloseButton onClick={(e)=>handleDeleteSelectedIdol(e, idol)}>X</CloseButton>
            </Selected>
          })}
          {

          }
        </IdolGrid>
      </SelectedSection>
      <h3>전체 아이돌</h3>
      <IdolWrapper>
        <IdolGrid cols={6}>
          {idols.map(idol => (
            <IdolImageWrapper >
              <IdolImage url={idol.idolImg} onClick={(e)=>handleSelectIdol(e, idol)}/>
              <IdolName>{idol.idolName}</IdolName>
            </IdolImageWrapper>
          ))}
        </IdolGrid>
      </IdolWrapper>
    </>
  );

  return (
    <PageWrapper>
      {pageIdx === 1 ? page1 : page2}
      {/*<h2>닉네임 설정</h2>*/}
      {/*<NicknameInput onChange={(e)=>handleNickname(e)} value={nickname}/>*/}
      {/*<DuplicateDiv isUnique={isUnique}>{isUnique? "사용 가능한 닉네임입니다" : isUnique === false? "이미 사용중인 닉네임입니다" : " "}</DuplicateDiv>*/}
      {/*{ !isUnique && <PurpleButton onClick={handleCheckUnique}>중복 확인</PurpleButton> }*/}
      {/*{ isUnique && <PurpleButton>다음으로</PurpleButton> }*/}
    </PageWrapper>
  );
}

export default SignUpPage;
