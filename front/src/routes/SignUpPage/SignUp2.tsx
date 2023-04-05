import React, {useCallback, useState} from 'react';
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CreateFavIdols } from "../../_store/slices/UserSlice";
import {
  NotSelected,
  IdolGrid,
  IdolSection,
  Selected,
  SelectedSection
} from "../../components/SignUpPage/IdolComponents";
import IdolImgNameContainer from "../../components/IdolImgNameContainer";
import {BlueButton, CloseButton, PurpleButton} from "../../components/Button";
import axios from "axios";
import {Description, DescriptionSection, PageContainer} from "../../components/SignUpPage/SignUpComponents";
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


  /** 좋아하는 아이돌을 선택하자 */
  const handleSelectIdol = useCallback((idol: string): void => {
    if (selectedIdols.length >= 5) {
      alert("최대 5명의 아이돌만 선택할 수 있습니다");
      return;
    }
    else {
      setSelectedIdols(prev => [...prev, idol]);
    }
  }, [selectedIdols]);

  /** 선택한 아이돌을 삭제하자 */
  const handleDeleteSelectedIdol = useCallback((idol: string): void => {
    // 선택된 배열에서 삭제를 하자궁...
    setSelectedIdols(prev=> prev.filter(selectedIdol => selectedIdol !== idol));
  }, []);
  // /** 선택된 아이돌을 보여주자 */
  const showSelectIdols = useCallback(() => {
    const returnArr = selectedIdols?.map(idol =>
      <Selected url={`https://j8a507.p.ssafy.io/img/${encodeURI(idol)}.webp`} width="100px" >
        <CloseButton onClick={()=>handleDeleteSelectedIdol(idol)}>X</CloseButton>
      </Selected>
    )
    for (let i=0; i<5-selectedIdols.length; i++) {
      returnArr.push(<NotSelected width="100px" />)
    }
    return returnArr;
  }, [selectedIdols, handleDeleteSelectedIdol]);

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
    <PageContainer>
      <SelectedSection>
        <DescriptionSection>
          <h2>좋아하는 아이돌 선택</h2>
          <Description>좋아하는 아이돌을 한 팀 이상 선택해주세요. <br/>최대 다섯 팀까지 선택 가능합니다.</Description>
          <div>
            <PurpleButton width="120px" onClick={() => handleChangePage(2)}>이전으로</PurpleButton>
            <BlueButton width="120px" onClick={handleSignUp} disabled={selectedIdols.length<=0}>회원가입 완료</BlueButton>
          </div>
        </DescriptionSection>
        <IdolGrid cols={5}>{ showSelectIdols() }</IdolGrid>
      </SelectedSection>
      <h2 >전체 아이돌</h2>
      <IdolSection>
        <IdolGrid cols={6} gap="20px">
          {idolLists.idols.map((idol: string) =>
            <IdolImgNameContainer
              url={`https://j8a507.p.ssafy.io/img/${encodeURIComponent(`${idol}`)}.webp`}
              width="100%"
              idol={ idol }
              onClick={()=> selectedIdols.includes(idol) ? handleDeleteSelectedIdol(idol) : handleSelectIdol(idol)}
              className={`${selectedIdols.includes(idol) && "selected"}`}
            />
          )}
        </IdolGrid>
      </IdolSection>
    </PageContainer>
  );
}

export default SignUp2;