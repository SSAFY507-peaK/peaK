import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import Card from "./Card";
import IdolProfile from "../IdolProfile";

const CarouselCustom = (props: any) => {
  let items = props.items;
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Card {...settings}>
      {items.map((item: any) => (
        <IdolProfile shape="rect" width="250px" height="250px" url={item.src} />
      ))}
    </Card>
  );
};

export default CarouselCustom;
