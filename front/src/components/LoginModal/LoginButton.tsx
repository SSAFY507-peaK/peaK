import styled from "styled-components";
import kakaoLogin from "../../assets/kakao_round.png";
import naverLogin from "../../assets/naver_round.png";

const ButtonWrapper = styled.button`
  width: 250px;
  height: 45px;
  margin-bottom: 15px;
  background-color: transparent;
  position: relative;
`;
const IconSection = styled.img`
  padding: 0;
  margin: 0;
  width: 45px;
  height: 45px;
  position: absolute;
  left: 0;
  top: 0;
`;

const LoginButton = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 30px;

  background-color: white;
  color: var(--gray200-color);
  transition: all 100ms ease-in;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const NaverLoginButton = styled(LoginButton)`
  border: 2px solid #03c75a;
  &:hover {
    background-color: #03c75a;
    color: white;
  }
`;
const KakaoLoginButton = styled(LoginButton)`
  border: 2px solid #fee500;
  &:hover {
    background-color: #fee500;
  }
`;

function NaverLogin() {
  return (
    <ButtonWrapper>
      <IconSection src={naverLogin} alt="네이버 소셜 로그인" />
      <NaverLoginButton>네이버로 로그인</NaverLoginButton>
    </ButtonWrapper>
  );
}

function KakaoLogin() {
  return (
    <ButtonWrapper>
      <IconSection src={kakaoLogin} alt="카카오 소셜 로그인"></IconSection>
      <KakaoLoginButton>카카오로 로그인</KakaoLoginButton>
    </ButtonWrapper>
  );
}

export { KakaoLogin, NaverLogin };
