import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import Card from "./Card";
import CarouselProfile from "./CarouselProfile";

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
        <div>
          <CarouselProfile width={width} height={height} url={item.src} />
          <p>{item.title || item.name}</p>
        </div>
      ))}
    </Card>
  );
};

export default CarouselCustom;