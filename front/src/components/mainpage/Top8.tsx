import IdolRank from "./IdolRank";
import styled from "styled-components";

const RankDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const RankTopDiv = styled.div`
  width: 100%;
  flex: 0.55;
  display: flex;
  position: relative;
  justify-content: space-evenly;
`;

const RankBottomDiv = styled.div`
  width: 100%;
  flex: 0.45;
  display: flex;
  position: relative;
  justify-content: space-evenly;
`;

function Top8() {
  const itemsTop = [
    {
      rank: 1,
      name: "세븐틴",
      score: "16931",
      url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA2MDFfOTgg%2FMDAxNjU0MDQwMTY5MTUx.NlszJe0R0vMxBz3WzJ1RrMbkuPgKjyGXhRQPcUlDcOgg.8gu7uH7x3uSF-5a2eQjH5Sa1R7wyp2P-y14rskFpTbog.JPEG.junpei%2FBTSGQ.jpg&type=a340",
    },
    {
      rank: 2,
      name: "IVE",
      score: "15222",
      url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F445%2F2023%2F01%2F19%2F0000093185_001_20230119205601587.jpg&type=a340",
    },
    {
      rank: 3,
      name: "BTS",
      score: "14114",
      url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA3MzBfMTkz%2FMDAxNjU5MTQ5MzU3MDM1.6fMQIMtuDroBmzIZZhkyyfcNb2HXnt3mKW2PsMJ2RCEg.Qcvt3VnrT7c04VVVkCgym_evilydpHmrSJsUrAmgYNog.JPEG.shinejoshua%2FIMG_6101.JPG&type=a340",
    },
  ];
  const itemsBottom = [
    {
      rank: 4,
      name: "NCT",
      score: "12712",
      url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA2MDFfOTgg%2FMDAxNjU0MDQwMTY5MTUx.NlszJe0R0vMxBz3WzJ1RrMbkuPgKjyGXhRQPcUlDcOgg.8gu7uH7x3uSF-5a2eQjH5Sa1R7wyp2P-y14rskFpTbog.JPEG.junpei%2FBTSGQ.jpg&type=a340",
    },
    {
      rank: 5,
      name: "NCT 127",
      score: "10008",
      url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA2MDFfOTgg%2FMDAxNjU0MDQwMTY5MTUx.NlszJe0R0vMxBz3WzJ1RrMbkuPgKjyGXhRQPcUlDcOgg.8gu7uH7x3uSF-5a2eQjH5Sa1R7wyp2P-y14rskFpTbog.JPEG.junpei%2FBTSGQ.jpg&type=a340",
    },
    {
      rank: 6,
      name: "NCT 127",
      score: "10008",
      url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA2MDFfOTgg%2FMDAxNjU0MDQwMTY5MTUx.NlszJe0R0vMxBz3WzJ1RrMbkuPgKjyGXhRQPcUlDcOgg.8gu7uH7x3uSF-5a2eQjH5Sa1R7wyp2P-y14rskFpTbog.JPEG.junpei%2FBTSGQ.jpg&type=a340",
    },
    {
      rank: 7,
      name: "NCT 127",
      score: "10008",
      url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA2MDFfOTgg%2FMDAxNjU0MDQwMTY5MTUx.NlszJe0R0vMxBz3WzJ1RrMbkuPgKjyGXhRQPcUlDcOgg.8gu7uH7x3uSF-5a2eQjH5Sa1R7wyp2P-y14rskFpTbog.JPEG.junpei%2FBTSGQ.jpg&type=a340",
    },
    {
      rank: 8,
      name: "NCT 127",
      score: "10008",
      url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA2MDFfOTgg%2FMDAxNjU0MDQwMTY5MTUx.NlszJe0R0vMxBz3WzJ1RrMbkuPgKjyGXhRQPcUlDcOgg.8gu7uH7x3uSF-5a2eQjH5Sa1R7wyp2P-y14rskFpTbog.JPEG.junpei%2FBTSGQ.jpg&type=a340",
    },
  ];
  return (
    <RankDiv>
      <RankTopDiv>
        {itemsTop.map(item => (
          <IdolRank name={item.name} rank={item.rank} url={item.url} />
        ))}
      </RankTopDiv>
      <RankBottomDiv>
        {itemsBottom.map(item => (
          <IdolRank name={item.name} rank={item.rank} url={item.url} />
        ))}
      </RankBottomDiv>
    </RankDiv>
  );
}

export default Top8;
