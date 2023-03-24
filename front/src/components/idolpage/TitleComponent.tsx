import styled from "styled-components";

interface TitleType {
  blacktxt: string;
  purpletxt : string;
}

const TitleFrame = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin: 30px 0px 20px 10px;
  color: ${props => props.color || `var(--purple500-color)`};
`;


function TitleComponent({blacktxt, purpletxt}:TitleType) {
  return (
    <TitleFrame>
      <Title color="black">{blacktxt}</Title>
      <Title>{purpletxt}</Title>
    </TitleFrame>  )
}

export default TitleComponent;