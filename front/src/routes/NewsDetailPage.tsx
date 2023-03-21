import News from "../components/News";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const TapMenu = styled.div`
  font-size: 24px;
  margin-top: 50px;
  margin-bottom: 25px;
`;

function NewsDetailPage() {
  const params = useParams();
  const idolName = params.idolName;

  return (
    <div>
      <TapMenu>이 페이지는 "{`${idolName}`}" 아이돌의 상세 뉴스를 확인할 수 있습니다.</TapMenu>
      <News></News>
    </div>
  );
}

export default NewsDetailPage;
