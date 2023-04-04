import styled from "styled-components";
import kakaoLogin from "../../assets/kakao_round.png";
import naverLogin from "../../assets/naver_round.png";

const ButtonWrapper = styled.button`
  width: 250px;
  height: 45px;
  margin-bottom: 15px;
  background-color: transparent;
  position: relative;
  &:nth-last-of-type(1) {
    margin-bottom: 0;
  }
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
      <NaverLoginButton>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;네이버로 로그인</NaverLoginButton>
    </ButtonWrapper>
  );
}

function KakaoLogin() {
  const handleLoginKakao = () => {
    // axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해
    // axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
    // axios.post("https://j8a507.p.ssafy.io/api/oauth2/authorization/kakao")
    //   .then(response => console.log(response))
    //   .catch(error => console.log(error))
    window.location.href='https://j8a507.p.ssafy.io/api/oauth2/authorization/kakao'
  }

  return (
    <ButtonWrapper onClick={handleLoginKakao}>
      <IconSection src={kakaoLogin} alt="카카오 소셜 로그인"></IconSection>
      <KakaoLoginButton>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;카카오로 로그인</KakaoLoginButton>
    </ButtonWrapper>
  );
}

export { KakaoLogin, NaverLogin };
