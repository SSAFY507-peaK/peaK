import React, {useCallback, useState} from 'react';
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CreateFavIdols } from "../../_store/slices/UserSlice";
import {
  EmptySelected,
  IdolGrid, IdolImage, IdolImageWrapper, IdolName,
  IdolWrapper,
  Selected,
  SelectedSection
} from "../../components/SignUpPage/IdolComponents";
import {BlueButton, CloseButton, PurpleButton} from "../../components/Button";
import axios from "axios";
import {Description, DescriptionSection, PageWrapper} from "../../components/SignUpPage/SignUpComponents";
import {IdolListsType} from "../../_utils/Types";
import {RootState} from "../../_store/store";


type SignUp2Type = {
  TOKEN?: string;
  handleChangePage: (value: number) => void;
  idolLists: IdolListsType;
}

function SignUp2({handleChangePage, idolLists}: SignUp2Type) {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const TOKEN = useSelector((state:RootState) => state.userInfo.TOKEN);
  const NICKNAME = useSelector((state:RootState) => state.userInfo.nickname)
  const [selectedIdols, setSelectedIdols] = useState<string[]>([]);

  // /** 선택된 아이돌을 보여주자 */
  const showSelectIdols = useCallback(() => {
    const returnArr = selectedIdols?.map(idol =>
      <Selected url={`https://j8a507.p.ssafy.io/img/${encodeURI(idol)}.webp`} >
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
    // 선택된 배열에서 삭제를 하자궁...
    setSelectedIdols(prev=> prev.filter(selectedIdol => selectedIdol !== idol));
  }
  /** 회원가입을 하자 */
  const handleSignUp = () => {
    dispatch(CreateFavIdols(selectedIdols));

    const headers = {
      Authorization: TOKEN,
    };
    const body = {
      nickname: NICKNAME,
      interest: selectedIdols,
    }
    console.log({headers, body});
    axios.post(`https://j8a507.p.ssafy.io/api/user/sign-up`, body, {
      headers: headers
    })
      .then(response => console.log(response.data))
      .catch(error => console.log(error))

    navigate('/')
  }

  return (
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
          {idolLists.idols.map((idol: string) => (
            <IdolImageWrapper>
              <IdolImage url={`https://j8a507.p.ssafy.io/img/${encodeURIComponent(idol)}.webp`} onClick={()=> selectedIdols.includes(idol) ? handleDeleteSelectedIdol(idol) : handleSelectIdol(idol)} className={`${selectedIdols.includes(idol) && "selected"}`}/>
              <IdolName>{idol}</IdolName>
            </IdolImageWrapper>
          ))}
        </IdolGrid>
      </IdolWrapper>
    </PageWrapper>
  );
}

export default SignUp2;