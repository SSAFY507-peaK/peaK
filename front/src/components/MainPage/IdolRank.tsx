import Rank1 from "../../assets/1.png";
import Rank2 from "../../assets/2.png";
import Rank3 from "../../assets/3.png";
import Rank4 from "../../assets/4.png";
import Rank5 from "../../assets/5.png";
import Rank6 from "../../assets/6.png";
import Rank7 from "../../assets/7.png";
import Rank8 from "../../assets/8.png";
import styled from "styled-components";

type IdolImgType = {
  url: string;
  rank: number;
};

type IdolRankType = {
  url: string;
  name: string;
  rank: number;
};

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0;
`;

const IdolImg = styled.div<IdolImgType>`
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center;
  border-radius: 70px;
  box-shadow: 0px 0px 10px -5px rgb(28, 28, 28);
  width: ${props => (props.rank <= 3 ? "12vw" : "8vw")};
  height: ${props => (props.rank <= 3 ? "12vw" : "8vw")};
  margin: 15px 0px 0px 20px;
  transition: all 100ms ease-in-out;
  &:hover {
    transform: scale(1.03, 1.03);
    cursor: pointer;
  }
  z-index: 1;
`;

const NameDiv = styled.div`
  margin-left: 20px;
  margin-top: 5px;
  font-size: 15px;
`;

function Logo(rank: number) {
  switch (rank) {
    case 1:
      return <img src={Rank1} alt="" width="60vw" style={{ position: "absolute" }} />;
    case 2:
      return <img src={Rank2} alt="" width="60vw" style={{ position: "absolute" }} />;
    case 3:
      return <img src={Rank3} alt="" width="60vw" style={{ position: "absolute" }} />;
    case 4:
      return <img src={Rank4} alt="" width="60vw" style={{ position: "absolute" }} />;
    case 5:
      return <img src={Rank5} alt="" width="60vw" style={{ position: "absolute" }} />;
    case 6:
      return <img src={Rank6} alt="" width="60vw" style={{ position: "absolute" }} />;
    case 7:
      return <img src={Rank7} alt="" width="60vw" style={{ position: "absolute" }} />;
    case 8:
      return <img src={Rank8} alt="" width="60vw" style={{ position: "absolute" }} />;
  }
}

/** rank, name, img 필요 */
function IdolRank(props: IdolRankType) {
  return (
    <WrapperDiv>
      {Logo(props.rank)}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <IdolImg url={props.url} rank={props.rank} />
        <NameDiv>{props.name}</NameDiv>
      </div>
    </WrapperDiv>
  );
}

export default IdolRank;
