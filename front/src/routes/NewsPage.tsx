import News from "../components/News";
import styled from "styled-components";

const TapMenu = styled.div`
  font-size: 24px;
  margin-top: 50px;
  margin-bottom: 25px;
`;
function NewsPage() {
  return (
    <div>
      <TapMenu>트렌딩 뉴스</TapMenu>
      <News></News>
    </div>
  );
}

export default NewsPage;
