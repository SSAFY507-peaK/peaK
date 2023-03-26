import styled from "styled-components";

interface CarouselProfileType {
  url: string;
  width: string;
  height: string;
}

const CarouselProfile = styled.div<CarouselProfileType>`
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center;
  width: ${props => props.width};
  height: ${props => props.height};
`;

export default CarouselProfile;
