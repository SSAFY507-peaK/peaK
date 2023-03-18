import React from 'react';
import { Link } from 'react-router-dom'

function SelectPage() {
  return (
    <div>
      <h1>좋아하는 아이돌을 선택하는 페이지</h1>
      <h2>최소 1명, 최대 5명의 아이돌을 선택해야 합니당.</h2>
      <h2><Link to='../'>회원가입 완료</Link></h2>
    </div>
  );
}

export default SelectPage;