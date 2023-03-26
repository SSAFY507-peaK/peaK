import styled from "styled-components";

type WrapperType = {
  backgroundColor?: string;
};

type ImageType = {
  width?: string;
}
const SectionWrapper = styled.div<WrapperType>`
  height: 100vh;
  //height: 100%;
  width: 100%;
  background-color: ${props => props.backgroundColor};
  display: flex;
  padding-left: 15%;
  padding-right: 15%;
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
    width: ${props => props.width || "70%"};
  }
`;

export { SectionWrapper, TextSection, ImageSection };
