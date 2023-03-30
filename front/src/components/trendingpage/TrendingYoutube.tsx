import React from "react";
import ReactPlayer from "react-player/youtube";
import styled from "styled-components";
import { useState } from "react";

// import ReactPlayer from "react-player/lazy";

const YoutubeListDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const YoutubeDiv = styled.div`
  width: 100%;
  height: 30vh;
  margin-bottom: 3vh;
`;

function TrendingYoutube() {
  const [hover, setHover] = useState(false);
  const items = [
    {
      title:
        "[#인생술집] 모두를 뒤집어지게 만든 파격 발언! 대유잼 직진으로 푸는 신동엽 X 이혜영의 소개팅 썰 - YouTube",
      url: "https://www.youtube.com/watch?v=8xhkZBiUIjE",
      thumbnail: "https://www.youtube.com/img/desktop/yt_1200.png",
    },
    {
      title:
        "[#인생술집] 모두를 뒤집어지게 만든 파격 발언! 대유잼 직진으로 푸는 신동엽 X 이혜영의 소개팅 썰 - YouTube",
      url: "https://www.youtube.com/watch?v=8xhkZBiUIjE",
      thumbnail: "https://www.youtube.com/img/desktop/yt_1200.png",
    },
    {
      title:
        "[#인생술집] 모두를 뒤집어지게 만든 파격 발언! 대유잼 직진으로 푸는 신동엽 X 이혜영의 소개팅 썰 - YouTube",
      url: "https://www.youtube.com/watch?v=8xhkZBiUIjE",
      thumbnail: "https://www.youtube.com/img/desktop/yt_1200.png",
    },
    {
      title:
        "[#인생술집] 모두를 뒤집어지게 만든 파격 발언! 대유잼 직진으로 푸는 신동엽 X 이혜영의 소개팅 썰 - YouTube",
      url: "https://www.youtube.com/watch?v=8xhkZBiUIjE",
      thumbnail: "https://www.youtube.com/img/desktop/yt_1200.png",
    },
  ];
  return (
    <YoutubeListDiv>
      {items.map(item => (
        <YoutubeDiv onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
          <ReactPlayer url={item.url} width="100%" height="100%"></ReactPlayer>
          {/* {hover ? (
            <ReactPlayer url={item.url}></ReactPlayer>
          ) : (
            <img src={item.thumbnail} alt="" style={{ width: "100%", height: "100%" }} />
          )} */}
        </YoutubeDiv>
      ))}
    </YoutubeListDiv>
  );
}

export default TrendingYoutube;
