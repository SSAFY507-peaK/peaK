import "./styles.scss";

import React, { useState } from "react";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styled from "styled-components";

const AlignDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const MAX_VISIBILITY = 3;

const Card = props => (
  <div
    className="card"
    style={{
      backgroundImage: `url(${props.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      cursor: "pointer",
      // width: "100%",
      height: "100%",
    }}
    onClick={event => {
      event.preventDefault();
      window.open(props.link);
    }}
  >
    <h3>{props.title}</h3>
    {props.content ? (
      props.content.length < 80 ? (
        <p>{props.content}</p>
      ) : (
        <p>{props.content.substr(0, 80) + "..."}</p>
      )
    ) : null}
  </div>
);

const Carousel = ({ children }) => {
  const [active, setActive] = useState(2);
  const count = React.Children.count(children);

  return (
    <div className="carousel">
      {active > 0 && (
        <button className="nav left" onClick={() => setActive(i => i - 1)}>
          <ArrowBackIosNewIcon sx={{ fontSize: "1.75rem" }} />
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
          <ArrowForwardIosIcon sx={{ fontSize: "1.75rem" }} />
        </button>
      )}
    </div>
  );
};

const CarouselCustom = props => {
  return (
    <AlignDiv>
      <Carousel>
        {props.data.map((item, idx) => {
          return (
            <Card
              title={item.title.length <= 23 ? item.title : item.title.substr(0, 23) + "..."}
              content={
                item.summary
                  ? item.summary.length <= 60
                    ? item.summary
                    : item.summary.substr(0, 60) + "..."
                  : null
              }
              src={item.thumbnailLink || item.thumbnail}
              link={item.link || item.url}
              key={idx}
            />
          );
        })}
      </Carousel>
    </AlignDiv>
  );
};

export default CarouselCustom;
