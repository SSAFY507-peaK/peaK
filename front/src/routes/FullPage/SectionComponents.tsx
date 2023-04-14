import styled from "styled-components";

type PageContainerType = {
  backgroundColor?: string;
};

const FullPageContainer = styled.div`
  height: 100vh;
  overflow-y: hidden;
  border: 0;
  position: relative;
`

const PageContainer = styled.div<PageContainerType>`
  height: 100%;
  width: 100%;
  background-color: ${props => props.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ContentSection = styled.div`
  width: var(--content-space);
  height: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
`;

const TextSection = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  
  &.right {
    align-items: end;
    & div {
      text-align: right;
    }
  }
  
  & h1 {
    margin-bottom: 25px;
  }
  h1:after {
    content: "";
    display: block;
    width: 40px;
    padding-bottom: 15px;
    border-bottom: 2px solid var(--gray100-color);
  }
  & > div {
    margin-bottom: 12px;
    :nth-last-of-type(1) {
      margin-bottom: 0;
    }
  }
  & p {
    font-size: 1.1rem;
    margin: 7px 0 0 0;
  }
`;


export { PageContainer, TextSection, ContentSection, FullPageContainer };
