import styled, { css } from "styled-components";

type ButtonColor = "red" | "purple";

interface ButtonType {
  buttonColor: ButtonColor;
  width?: string;
}

const Button = styled.button<ButtonType>`
  color: white;
  font-size: 0.8rem;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px;
  height: 33px;
  width: ${props => (props.width ? props.width : "auto")};
  /* display: flex;
  align-items: center; */
  text-align: center;

  ${props =>
    props.buttonColor === "red" &&
    css`
      background-color: var(--red600-color);
      &:hover {
        background-color: var(--red300-color);
      }
    `};

  ${props =>
    props.buttonColor === "purple" &&
    css`
      background-color: var(--purple500-color);
      &:hover {
        background-color: var(--purple300-color);
      }
    `}
`;

export default Button;
