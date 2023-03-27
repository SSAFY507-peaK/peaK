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

const Title = styled.h2`
  /* font-size: 2rem;
  font-weight: 700; */
  margin: 30px 0px 20px 10px;
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
        <Title>{purpletxt}</Title>
        <Title color="black">{blacktxt}</Title>
      </TitleFrame>
    )
  }
}

export default TitleComponent;