import { Link } from "react-router-dom";

/** 메인페이지 */
function MainPage() {
  return (
    <div>
      <h1>MainPage</h1>
      <h2>로그인 시 -{`>`} 메인 페이지 렌더링</h2>
      <h2>로그인 X -{`>`} 인트로 페이지 렌더링</h2>
      <h3>그냥 다르게 렌더링할까..?</h3>
      <hr />
      <div>일단 link잘 되는지 확인용으로 아래 써둘게요</div>
      <Link to="ranking">랭킹 페이지</Link>
      <br />
      <Link to="news">뉴스 페이지</Link>
      <br />
      <Link to={`아이돌이름`}>아이돌 페이지</Link>
      <br />
      <Link to={`mypage/유저이름`}>내 페이지</Link>
      <br />
      <Link to="signup/nickname">회원가입 시 닉네임 설정 페이지</Link>
    </div>
  );
}

export default MainPage;
