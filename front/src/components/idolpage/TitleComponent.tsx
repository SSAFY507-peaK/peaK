import styled from "styled-components";

interface TitleType {
  id?: string;
  blacktxt: string;
  purpletxt : string;
}

const TitleFrame = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.h3`
  /* font-size: 2rem;
  font-weight: 700; */
  /* margin-right: 10px; */
  margin: 0px 10px 20px 0px;
  color: ${props => props.color || `var(--purple500-color)`};
`;


function TitleComponent({blacktxt, purpletxt, id}:TitleType) {
  if (id === "1") {
    return (
      <TitleFrame id = {id}>  
        <Title>{purpletxt}</Title>
        <Title color="black">{blacktxt}</Title>
      </TitleFrame>
    )  
  } else {
    return (
      <TitleFrame>
        <Title color="black">{blacktxt}</Title>
        <Title>{purpletxt}</Title>
      </TitleFrame>
    )
  }
}

export default TitleComponent;