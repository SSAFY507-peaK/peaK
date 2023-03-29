import styled from "styled-components";

interface PurpleH3Type {
  type: boolean;
}

interface WrapperDivType {
  ratio: number;
  mr?: boolean;
  ml?: boolean;
  mt?: boolean;
  mb?: boolean;
}

/** NameDiv와 ContentDiv를 감싸는 역할 */
const WrapperDiv = styled.div<WrapperDivType>`
  display: flex;
  flex-direction: column;
  flex: ${props => props.ratio};
  margin-right: ${props => (props.mr ? "25px" : "0px")};
  margin-left: ${props => (props.ml ? "25px" : "0px")};
  margin-top: ${props => (props.mt ? "25px" : "0px")};
  margin-bottom: ${props => (props.mb ? "25px" : "0px")};
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 0px 3px rgba(151, 151, 151, 0.25);
  padding: 20px;
  height: 100%;
`;

const PurpleH3 = styled.h3<PurpleH3Type>`
  color: var(--purple400-color);
  margin-right: ${props => (props.type ? "5px" : "0px")};
  margin-left: ${props => (props.type ? "0px" : "5px")};
`;

function NameDiv(props: any) {
  const type = props.type;
  const firstWord = props.firstWord;
  const secondWord = props.secondWord;

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

/** type이 true이면 purple이 왼쪽, false이면 오른쪽 */
function CommonDiv(props: any) {
  return (
    <WrapperDiv ratio={props.ratio} mr={props.mr}>
      {NameDiv(props)}
      <ContentDiv>{props.data}</ContentDiv>
    </WrapperDiv>
  );
}

export default CommonDiv;
