import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import Card from "./Card";
import CarouselProfile from "./CarouselProfile";
import styled from "@emotion/styled";

const CarouselWith = styled.div`
  position: relative;
  height: 100%;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const CarouselTitle = styled.div`
  font-size: 18px;
  color: white;
  text-shadow: 1px 1px 2px #232323;
  font-weight: bold;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const CarouselContent = styled.div`
  font-size: 12px;
  color: #ededed;
  text-shadow: 1px 1px 2px #626262;
  display: flex;
  align-items: flex-end;
  margin: 5px 0px;
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
          <CarouselWith>
            <CarouselTitle>{item.title || item.name}</CarouselTitle>
            {item.content && <CarouselContent>{item.content}</CarouselContent>}
          </CarouselWith>
        </CarouselProfile>
      ))}
    </Card>
  );
};

export default CarouselCustom;
