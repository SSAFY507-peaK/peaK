import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import Card from "./Card";
import CarouselProfile from "./CarouselProfile";
import styled from "@emotion/styled";

const CarouselTitle = styled.div`
  position: relative;
  padding: 20px 20px 20px 30px;
  font-size: 20px;
  color: white;
  text-shadow: 1px 1px 1px black;
  /* text-shadow: 1px 1px 2px black; */
  display: flex;
  align-items: flex-end;
  height: 95%;
  justify-content: space-between;
`;

const CarouselCustom = (props: any) => {
  let items = props.items;
  let width = props.width;
  let height = props.height;
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Card {...settings}>
      {items.map((item: any) => (
        <CarouselProfile width={width} height={height} url={item.src}>
          <CarouselTitle>{item.title || item.name}</CarouselTitle>
        </CarouselProfile>
      ))}
    </Card>
  );
};

export default CarouselCustom;
