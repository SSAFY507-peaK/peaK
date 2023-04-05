import React, {useState} from 'react';
import axios from "axios";
import {Description, InputWrapper, PageWrapper} from "../../components/SignUpPage/SignUpComponents";
import {MessageDiv, NicknameInput} from "../../components/SignUpPage/NicknameComponents";
import {BlueButton, PurpleButton} from "../../components/Button";

type NicknameType = "EU006" | "EU009" | "200" ;
type SignUp1Type = {
  TOKEN: string;
  handleChangePage: (value: number) => void;
}
function SignUp1({TOKEN, handleChangePage}: SignUp1Type) {
  const [nickname, setNickname] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [nicknameCode, setNicknameCode] = useState<NicknameType | undefined>(undefined);

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNickname(e.target.value);
    setNicknameCode(undefined);
    setMessage("");
  };

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

  return (
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
}

export default SignUp1;