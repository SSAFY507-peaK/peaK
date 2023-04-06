import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  overflow-y: hidden;
`;
const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 5vh 5vw 8vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Description = styled.p`
  margin-top: 0;
  color: var(--gray400-color);
`
// 첫 번째 페이지
const InputWrapper = styled.div`
  display: flex;
  & button {
    margin-right: 15px;
  }
`
// 두 번째 페이지
/** 아이돌 선택에 대한 설명을 담은 div */
const DescriptionSection = styled.div`
  flex: 1 0 350px;
  & button {
    margin-right: 15px;
  }
`
const SearchSection = styled.div`
  margin: 10px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export { Container, PageContainer, Description, InputWrapper, DescriptionSection, SearchSection};