import styled from "styled-components";
import kakaoLogin from "../../assets/kakao_round.png"
import naverLogin from "../../assets/naver_round.png"

const LoginButton = styled.button`
  width: 250px;
  height: 45px;
  border-radius: 30px;
  margin-bottom: 10px;
  
  background-color: white;
  color: var(--gray200-color);
  transition: all 100ms ease-in;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:hover {
    color: white;
  }
`
const NaverLoginButton = styled(LoginButton)`
  border: 2px solid #03C75A;
  &:hover {
    background-color: #03C75A;
  }
`
const KakaoLoginButton = styled(LoginButton)`
  border: 2px solid #FEE500;
  &:hover {
    background-color: #FEE500;
    color: rgba(0, 0, 0, 0.9);
  }
`

const IconSection = styled.img`
  padding: 0;
  margin: 0;
  width: 45px;
  height: 45px;
  &>img{
    width: 100%;
    height: 100%;
  }
`
const ContextSection = styled.div`
  flex: 1;
`

function NaverLogin ()  {
  return (
    <NaverLoginButton>
      <IconSection>
        <img src={naverLogin} alt="네이버 소셜 로그인"/>
      </IconSection>
      <ContextSection>
        네이버로 로그인
      </ContextSection>
    </NaverLoginButton>
  );
}

function KakaoLogin ()  {
  return (
    <KakaoLoginButton>
      <IconSection>
        <img src={kakaoLogin} alt="카카오 소셜 로그인"/>
      </IconSection>
      <ContextSection>
        카카오로 로그인
      </ContextSection>
    </KakaoLoginButton>
  );
}

export {KakaoLogin, NaverLogin} ;