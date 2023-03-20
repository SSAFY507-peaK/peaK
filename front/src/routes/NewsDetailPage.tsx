import React from "react";
import { useParams } from "react-router-dom";

function NewsDetailPage() {
  const params = useParams();
  const idolName = params.idolName;

  return (
    <div>
      <h1>아이돌 뉴스 디테일 페이지</h1>
      <h2>아이돌 키워드에 대한 디테일 뉴스를 확인할 수 있습니다.</h2>
      <h2>이 페이지는 "{`${idolName}`}" 아이돌의 상세 뉴스를 확인할 수 있습니다.</h2>
    </div>
  );
}

export default NewsDetailPage;
