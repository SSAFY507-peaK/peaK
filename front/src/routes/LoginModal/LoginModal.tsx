import React, {useRef} from 'react';
import styled from 'styled-components'
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { KakaoLogin, NaverLogin } from "../../components/LoginModal/LoginButton";
import useOnClickOutside from "../../_hooks/useOnClickOutside";


type LoginModalProps = {
  setLoginOpen: (loginOpen: boolean) => void;
}

const ModalBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  //filter: blur(10px);
  //-webkit-filter: blur(10px);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
`

const ModalWrapper = styled.div`
  width: 400px;
  height: 450px;
  background-color: white;
  border-radius: 20px;
  padding: 30px;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
`
const CloseButton = styled.button`
  height: 20px;
  width: 20px;
  border-radius: 15px;
  color: white;
  background-color: var(--gray700-color);
  
  position: absolute;
  top: 30px;
  right: 30px;
`

const LogoWrapper = styled.div`
  flex: 0.6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &>h2 {
    margin-top: 5px;
  }
`;
const ButtonWrapper = styled.div`
  flex: 0.4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &>h2 {
    margin-top: 5px;
  }
`;
// export async function action () {
//   await axios.post("https://j8a507.p.ssafy.io/api/oauth2/authorization/kakao")
//     .then(response => console.log(response))
//     .catch(error => console.log(error))
// }

function LoginModal({ setLoginOpen }:LoginModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {setLoginOpen(false)});



  return (
    <ModalBackground>
      <ModalWrapper ref={ref}>
        <CloseButton onClick={() => setLoginOpen(false)}>X</CloseButton>
        <LogoWrapper>
          <Logo />
          <h2>로그인하기</h2>
        </LogoWrapper>
        <ButtonWrapper>
          <NaverLogin/>
          <KakaoLogin />
        </ButtonWrapper>
      </ModalWrapper>
    </ModalBackground>
  );
}

export default LoginModal;