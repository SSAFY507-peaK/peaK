import styled from "styled-components";

export default function NameDiv(props: any) {
  interface PurpleH3Type {
    type: boolean;
  }
  const type = props.type;
  const firstWord = props.firstWord;
  const secondWord = props.secondWord;

  const TitleDiv = styled.div`
    display: flex;
    flex-direction: row;
  `;

  const PurpleH3 = styled.h3<PurpleH3Type>`
    color: var(--purple400-color);
    margin-right: ${props => (props.type ? "5px" : "0px")};
    margin-left: ${props => (props.type ? "0px" : "5px")};
  `;

  if (type === true) {
    return (
      <TitleDiv>
        <PurpleH3 type={type}>{firstWord}</PurpleH3>
        <h3>{secondWord}</h3>
      </TitleDiv>
    );
  } else {
    return (
      <TitleDiv>
        <h3>{firstWord}</h3>
        <PurpleH3 type={type}>{secondWord}</PurpleH3>
      </TitleDiv>
    );
  }
}
