import RankingComponent from "./RankComponent";
import styled from "styled-components";

const ContentDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

function RankingDiv(props: any) {
  let content = [];
  const items = [
    {
      rank: "1",
      change: "0",
      name: "세븐틴",
      score: "16931",
      src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA2MDFfOTgg%2FMDAxNjU0MDQwMTY5MTUx.NlszJe0R0vMxBz3WzJ1RrMbkuPgKjyGXhRQPcUlDcOgg.8gu7uH7x3uSF-5a2eQjH5Sa1R7wyp2P-y14rskFpTbog.JPEG.junpei%2FBTSGQ.jpg&type=a340",
    },
    {
      rank: "2",
      change: "+1",
      name: "IVE",
      score: "15222",
      src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA2MDFfOTgg%2FMDAxNjU0MDQwMTY5MTUx.NlszJe0R0vMxBz3WzJ1RrMbkuPgKjyGXhRQPcUlDcOgg.8gu7uH7x3uSF-5a2eQjH5Sa1R7wyp2P-y14rskFpTbog.JPEG.junpei%2FBTSGQ.jpg&type=a340",
    },
    {
      rank: "3",
      change: "+4",
      name: "BTS",
      score: "14114",
      src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA2MDFfOTgg%2FMDAxNjU0MDQwMTY5MTUx.NlszJe0R0vMxBz3WzJ1RrMbkuPgKjyGXhRQPcUlDcOgg.8gu7uH7x3uSF-5a2eQjH5Sa1R7wyp2P-y14rskFpTbog.JPEG.junpei%2FBTSGQ.jpg&type=a340",
    },
    {
      rank: "4",
      change: "-2",
      name: "NCT",
      score: "12712",
      src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA2MDFfOTgg%2FMDAxNjU0MDQwMTY5MTUx.NlszJe0R0vMxBz3WzJ1RrMbkuPgKjyGXhRQPcUlDcOgg.8gu7uH7x3uSF-5a2eQjH5Sa1R7wyp2P-y14rskFpTbog.JPEG.junpei%2FBTSGQ.jpg&type=a340",
    },
    {
      rank: "5",
      change: "-1",
      name: "NCT 127",
      score: "10008",
      src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA2MDFfOTgg%2FMDAxNjU0MDQwMTY5MTUx.NlszJe0R0vMxBz3WzJ1RrMbkuPgKjyGXhRQPcUlDcOgg.8gu7uH7x3uSF-5a2eQjH5Sa1R7wyp2P-y14rskFpTbog.JPEG.junpei%2FBTSGQ.jpg&type=a340",
    },
    {
      rank: "6",
      change: "-1",
      name: "NCT 127",
      score: "10008",
      src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA2MDFfOTgg%2FMDAxNjU0MDQwMTY5MTUx.NlszJe0R0vMxBz3WzJ1RrMbkuPgKjyGXhRQPcUlDcOgg.8gu7uH7x3uSF-5a2eQjH5Sa1R7wyp2P-y14rskFpTbog.JPEG.junpei%2FBTSGQ.jpg&type=a340",
    },
    {
      rank: "7",
      change: "-1",
      name: "NCT 127",
      score: "10008",
      src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA2MDFfOTgg%2FMDAxNjU0MDQwMTY5MTUx.NlszJe0R0vMxBz3WzJ1RrMbkuPgKjyGXhRQPcUlDcOgg.8gu7uH7x3uSF-5a2eQjH5Sa1R7wyp2P-y14rskFpTbog.JPEG.junpei%2FBTSGQ.jpg&type=a340",
    },
    {
      rank: "8",
      change: "-1",
      name: "NCT 127",
      score: "10008",
      src: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA2MDFfOTgg%2FMDAxNjU0MDQwMTY5MTUx.NlszJe0R0vMxBz3WzJ1RrMbkuPgKjyGXhRQPcUlDcOgg.8gu7uH7x3uSF-5a2eQjH5Sa1R7wyp2P-y14rskFpTbog.JPEG.junpei%2FBTSGQ.jpg&type=a340",
    },
  ];
  if (props.shape === "rect") {
    for (let i = 0; i < 3; i++) {
      const item = items[i];
      content.push(<RankingComponent item={item} />);
    }
  } else {
    for (let i = 3; i < 8; i++) {
      const item = items[i];
      content.push(<RankingComponent item={item} />);
    }
  }
  console.log(content);
  return <ContentDiv>{content}</ContentDiv>;
}

export default RankingDiv;
