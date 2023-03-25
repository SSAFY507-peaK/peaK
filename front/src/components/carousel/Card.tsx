import Slider from "react-slick";
import styled from "styled-components";

const Card = styled(Slider)`
  .slick-list {
    //얘로 크기조정 했음
    width: 250px;
    height: 250px;
    margin: 0 auto;
    padding: 0;
    background-color: #f0f9ff;
  }

  .slick-prev:before,
  .slick-next:before {
    //얘는 양옆 버튼. 커스텀 해줘야 보임
    font-family: "slick";
    font-size: 20px;
    line-height: 1;
    opacity: 0.5;
    // display: none;
    color: #000000;
    -webkit-font-smoothing: antialiased;
  }
`;
export default Card;
