import React from "react";
import ReactPlayer from "react-player/youtube";
import styled from "styled-components";
import { useState } from "react";

interface ThumbnailType {
  thumbnail: string;
}

const Thumbnail = styled.div<ThumbnailType>`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: url(${props => props.thumbnail});
  background-position: center 25%;
`;

function VideoComponent(props: any) {
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{ width: "100%", height: "20vh" }}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      {hover ? (
        <ReactPlayer url={props.item.url} width="100%" height="100%" playing={true} />
      ) : (
        <img
          src={props.item.thumbnail}
          alt=""
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
}

export default VideoComponent;
