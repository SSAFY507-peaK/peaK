import { IdolImageNameContainer, IdolName } from "../IdolImgNameContainer";

import { ClickTracker } from "../../_utils/UserTracker";
import Rank1 from "../../assets/1.png";
import Rank2 from "../../assets/2.png";
import Rank3 from "../../assets/3.png";
import Rank4 from "../../assets/4.png";
import Rank5 from "../../assets/5.png";
import Rank6 from "../../assets/6.png";
import Rank7 from "../../assets/7.png";
import Rank8 from "../../assets/8.png";
import styled from "styled-components";
import { useAppSelector } from "../../_hooks/hooks";
import { useNavigate } from "react-router";

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
  height: 100%;
  aspect-ratio: 1;
  flex-direction: column;
  margin: auto 0;
`;

const IdolImg = styled.div<IdolImgType>`
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center;
  border-radius: ${props => (props.rank > 3 ? "50%" : "40%")};
  box-shadow: 0 0 10px -5px rgb(28, 28, 28);
  width: 95%;
  aspect-ratio: 1;
  margin: 15px 0 0 30px;
  transition: all 100ms ease-in-out;
  &:hover {
    transform: scale(1.03, 1.03);
    cursor: pointer;
  }
  z-index: 1;
`;

const NameDiv = styled(IdolName)`
  margin-left: 30px;
  width: 100%;
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

/** rank, name, img 를 parameter로 가짐 */
function IdolRank({ url, name, rank }: IdolRankType) {
  const navigate = useNavigate();
  const userId: string = useAppSelector(state => state.userInfo.userId);

  return (
    <WrapperDiv
      onClick={() => {
        navigate(`/${name}`);
        ClickTracker(name, userId);
      }}
    >
      {Logo(rank)}
      <IdolImageNameContainer width="80%">
        <IdolImg url={url} rank={rank} />
        <NameDiv>{name}</NameDiv>
      </IdolImageNameContainer>
    </WrapperDiv>
  );
}

export default IdolRank;
