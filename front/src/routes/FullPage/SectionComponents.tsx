import styled from "styled-components";

const Wrapper = styled.div<{ backgroundColor: string }>`
  //height: 100vh;
  height: 100%;
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

const ImageSection = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 70%;
  }
`;

export { Wrapper, TextSection, ImageSection };
