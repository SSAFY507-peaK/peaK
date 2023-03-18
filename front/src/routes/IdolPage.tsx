import React from 'react';
import { Link, useParams } from 'react-router-dom';

function IdolPage() {
  const params = useParams();
  const idolName = params.idolName;

  return (
    <div>
      <h1>아이돌 디테일 페이지입니다.</h1>
      <h2>이 페이지의 아이돌 이름은 "{`${idolName}`}"입니다. </h2>
      <h2><Link to={`/news/${idolName}`}>이 아이돌의 뉴스 디테일 페이지로 이동</Link></h2>
    </div>
  );
}

export default IdolPage;