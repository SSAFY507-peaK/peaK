import { Link } from "react-router-dom";
import React from "react";

function NicknamePage() {
  return (
    <div>
      <h1>회원가입 시 닉네임 설정</h1>
      <h2>닉네임 중복확인 후 중복되지 않을 경우에만 다음으로 이동 가능함</h2>
      <h2>
        <Link to="/signup/select">다음으로</Link>
      </h2>
    </div>
  );
}

export default NicknamePage;
