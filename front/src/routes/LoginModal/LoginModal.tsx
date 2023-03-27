import React from 'react';
import styled from 'styled-components'
import {useLocation} from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { KakaoLogin, NaverLogin } from "../../components/LoginModal/LoginButton";

const ModalBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
  z-index: 999;
`
const ModalWrapper = styled.div`
  width: 400px;
  height: 450px;
  background-color: white;
  border-radius: 30px;
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

function LoginModal() {
  const location = useLocation();
  console.log(location);
  return (
    <ModalBackground>
      <ModalWrapper>
        <CloseButton>X</CloseButton>
        <LogoWrapper>
          <Logo />
          <h2>로그인하기</h2>
        </LogoWrapper>
        <ButtonWrapper>
          <NaverLogin />
          <KakaoLogin />
        </ButtonWrapper>
      </ModalWrapper>
    </ModalBackground>
  );
}

export default LoginModal;