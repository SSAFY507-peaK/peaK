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
  width: 500px;
  height: 550px;
  background-color: white;
  border-radius: 30px;
  padding: 100px 30px;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

function LoginModal() {
  const location = useLocation();
  console.log(location);
  return (
    <ModalBackground>
      <ModalWrapper>
        <div>
          <Logo />
          <h2>peaK에 로그인하기</h2>
        </div>
        <div>
          <NaverLogin  />
          <KakaoLogin />
        </div>
      </ModalWrapper>
    </ModalBackground>
  );
}

export default LoginModal;