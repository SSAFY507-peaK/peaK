import styled from "styled-components";

type PageContainerType = {
  backgroundColor?: string;
};

type ImageType = {
  width?: string;
}
// type HeightType = {
//   height: number;
// }

const FullPageContainer = styled.div`
  height: 100vh;
  overflow-y: hidden;
  border: 0;
  position: relative;
`

const PageContainer = styled.div<PageContainerType>`
  height: 100%;
  //height: 100%;
  //width: 100%;
  width: var(--content-space);
  background-color: ${props => props.backgroundColor};
  //position: relative;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  padding-left: 5%;
  padding-right: 5%;
`;

const TextSection = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;

  h2:after {
    content: "";
    display: block;
    width: 40px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--gray100-color);
  }
`;

const ImageSection = styled.div<ImageType>`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: ${props => props.width || "100%"};
  }
`;

export { PageContainer, TextSection, ImageSection, FullPageContainer };
