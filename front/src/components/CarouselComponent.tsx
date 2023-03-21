import IdolProfile from "./IdolProfile";
import styled from "styled-components";

const CarouselDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding-bottom: 15px;
  border-radius: 20px;
`;

function CarouselComponent(props) {
  const profileImg: string = props.profileImg;
  const profileTitle: string = props.profileTitle;
  return (
    <CarouselDiv>
      <IdolProfile shape="rect" url={profileImg} width="100%" height="190px"></IdolProfile>
      <div>{profileTitle}</div>
    </CarouselDiv>
  );
}

export default CarouselComponent;
