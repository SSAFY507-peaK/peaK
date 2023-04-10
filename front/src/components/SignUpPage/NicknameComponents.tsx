import styled from "styled-components";

type IsValidType = {
  isValid: boolean | undefined | string;
}

const NicknameInput = styled.input<IsValidType>`
  //background-color: white;
  padding: 5px 10px;
  height: 35px;
  width: 300px;
  border-bottom: 1px solid ${props => (props.isValid === "200" ? "blue" : props.isValid === undefined ? "var(--gray100-color)" : "red")};
  margin-bottom: 10px;
  margin-right: 20px
`;

const MessageDiv = styled.div<IsValidType>`
  height: 16px;
  font-size: 13px;
  padding-left: 10px;
  color: ${props => (props.isValid ? "blue" : "red")};
`;

export { NicknameInput, MessageDiv }