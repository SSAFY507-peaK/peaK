import styled from "styled-components";

interface ButtonType {
  width?: string;
  height?: string;
}

const Button = styled.button<ButtonType>`
  color: white;
  font-size: 0.8rem;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 100px;
  height: ${props => (props.height? props.height : "30px")};
  width: ${props => (props.width ? props.width : "auto")};
  text-align: center;
  transition: all 300ms ease-in-out;
`;

const PurpleButton = styled(Button)`
  background-color: var(--purple500-color);
  &:hover {
    background-color: var(--purple400-color);
  }
`

const RedButton = styled(Button)`
  background-color: var(--red600-color);
  &:hover {
    background-color: var(--red500-color);
  }
`

export { PurpleButton, RedButton };
