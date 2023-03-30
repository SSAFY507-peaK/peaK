import React from "react";
import ReactPlayer from "react-player/youtube";
import styled from "styled-components";

// import ReactPlayer from "react-player/lazy";

const YoutubeListDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const YoutubeDiv = styled.div`
  width: 100%;
  height: 30vh;
  margin-bottom: 3vh;
  border-radius: 10px;
`;

function TrendingYoutube() {
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
        <YoutubeDiv>
          <ReactPlayer
            url={item.url}
            width="100%"
            height="100%"
            light={true}
            controls={true}
          ></ReactPlayer>
        </YoutubeDiv>
      ))}
    </YoutubeListDiv>
  );
}

export default TrendingYoutube;
