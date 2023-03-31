import styled from "styled-components";

interface TitleType {
  id?: string;
  blacktxt: string;
  purpletxt: string;
  addtxt?: string;
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

const BigTitle = styled.h2`
  margin: 0px 5px 0px 0px;
  color: ${props => props.color || `var(--purple500-color)`};
`;


function TitleComponent({blacktxt, purpletxt, id, addtxt}:TitleType) {
  if (id === "1") {
    return (
      <TitleFrame id = {id}>  
        <Title>{purpletxt}</Title>
        <Title color="black">{blacktxt}</Title>
        {
          addtxt
          ?
          <Title color="black">{addtxt}</Title>
          :
          null
        }
      </TitleFrame>
    )  
  } else if (id === "2") {
    return (
      <TitleFrame id = {id}>  
        <BigTitle color="black">{blacktxt}</BigTitle>
        <BigTitle>{purpletxt}</BigTitle>
        {
          addtxt
          ?
          <BigTitle color="black">{addtxt}</BigTitle>
          :
          null
        }
      </TitleFrame>
    )
  } else {
    return (
      <TitleFrame>
        <Title color="black">{blacktxt}</Title>
        <Title>{purpletxt}</Title>
        {
          addtxt
          ?
          <Title color="black">{addtxt}</Title>
          :
          null
        }
      </TitleFrame>
    )
  }
}

export default TitleComponent;