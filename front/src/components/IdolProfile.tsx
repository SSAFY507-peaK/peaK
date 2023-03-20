import styled from "styled-components";

type Shape = "round" | "rect";

interface IdolProfileType {
  url: string;
  width: string;
  height: string;
  shape: Shape;
}

const IdolProfile = styled.div<IdolProfileType>`
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center;
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: ${props => (props.shape === "round" ? "50%" : "20px")};
`;

export default IdolProfile;
