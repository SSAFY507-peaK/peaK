import "./styles.scss";

import React, { useState } from "react";
import {
  TiChevronLeftOutline,
  TiChevronRightOutline,
} from "https://cdn.skypack.dev/react-icons/ti";

import styled from "styled-components";

const AlignDiv = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const CARDS = 10;
const MAX_VISIBILITY = 3;

const Card = ({ title, content }) => (
  <div className="card">
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
);

const Carousel = ({ children }) => {
  const [active, setActive] = useState(2);
  const count = React.Children.count(children);

  return (
    <div className="carousel">
      {active > 0 && (
        <button className="nav left" onClick={() => setActive(i => i - 1)}>
          <TiChevronLeftOutline />
        </button>
      )}
      {React.Children.map(children, (child, i) => (
        <div
          className="card-container"
          style={{
            "--active": i === active ? 1 : 0,
            "--offset": (active - i) / 3,
            "--direction": Math.sign(active - i),
            "--abs-offset": Math.abs(active - i) / 3,
            "pointer-events": active === i ? "auto" : "none",
            opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
            display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
          }}
        >
          {child}
        </div>
      ))}
      {active < count - 1 && (
        <button className="nav right" onClick={() => setActive(i => i + 1)}>
          <TiChevronRightOutline />
        </button>
      )}
    </div>
  );
};

const NewCarousel = () => (
  <AlignDiv>
    <Carousel>
      {[...new Array(CARDS)].map((_, i) => (
        <Card title={"Card " + (i + 1)} content="내용이로소이다" />
      ))}
    </Carousel>
  </AlignDiv>
);

export default NewCarousel;
