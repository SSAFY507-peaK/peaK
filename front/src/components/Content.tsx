import styled from "styled-components";

/** 그림자 있고 흰 색 배경 div 태그 */
const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 0px 3px rgba(151, 151, 151, 0.25);
  padding: 20px;
  height: 100%;
`;

export default ContentDiv;
