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
  height: ${props => (props.height? props.height : "35px")};
  width: ${props => (props.width ? props.width : "auto")};
  text-align: center;
  transition: all 300ms ease-in-out;
  
  // 버튼 비활성화하면 안눌리게 하기
  &[disabled] {
    background: var(--gray-gradient);
    cursor: default;
  }
`;

const PurpleButton = styled(Button)`
  background: var(--purple-gradient);
  &:hover {
    background: var(--purple-gradient-hover);
  }
  &[disabled] {
    background: var(--gray-gradient);
  }
`

const RedButton = styled(Button)`
  background: var(--red-gradient);

  &:hover {
    background: var(--red-gradient-hover);
  }
  &[disabled] {
    background: var(--gray-gradient);
  }
`

const BlueButton = styled(Button)`
  background: var(--blue-gradient);
  
  &:hover {
    background: var(--blue-gradient-hover);
  }
  &[disabled] {
    background: var(--gray-gradient);
  }
`

const CloseButton = styled.button`
  height: 20px;
  width: 20px;
  border-radius: 15px;
  color: white;
  background-color: var(--gray700-color);
  
  position: absolute;
  top: 0;
  right: 0;
`

export { PurpleButton, RedButton, BlueButton, CloseButton };
