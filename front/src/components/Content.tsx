import styled from "styled-components";

/** 그림자 있고 흰 색 배경 div 태그 */
const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(151, 151, 151, 0.25);
  padding: 30px;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.8);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: var(--gray700-color);
  }
`;

export default ContentDiv;
