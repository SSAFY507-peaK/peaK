import styled from "styled-components";

const NicknameInput = styled.input`
  //background-color: white;
  padding: 10px;
  width: 300px;
  border-bottom: 1px solid var(--gray100-color);
  margin-bottom: 5px;
`;

const MessageDiv = styled.div<{ isUnique: boolean | undefined }>`
  font-size: 13px;
  margin-bottom: 15px;
  color: ${props => (props.isUnique ? "blue" : props.isUnique === false ? "red" : "black")};
`;

export { NicknameInput, MessageDiv }