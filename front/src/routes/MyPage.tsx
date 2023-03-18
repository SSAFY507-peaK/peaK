import React from 'react';
import { useParams } from 'react-router-dom'

function MyPage() {
  const params = useParams();
  const userName = params.userName;

  return (
    <div>
      <h1>마이페이지</h1>
      <h2>{`${userName}`}님의 마이페이지입니다.</h2>
    </div>
  );
}

export default MyPage;