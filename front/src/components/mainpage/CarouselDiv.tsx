import NameDiv from "../NameDiv";
import styled from "styled-components";

/** 그림자 있고 흰 색 배경 div 태그 */
const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  height: 100%;
`;

interface WrapperDivType {
  ratio: number;
  mr?: boolean;
  ml?: boolean;
  mt?: boolean;
  mb?: boolean;
}

/** NameDiv와 ContentDiv를 감싸는 역할 */
const WrapperDiv = styled.div<WrapperDivType>`
  display: flex;
  flex-direction: column;
  flex: ${props => props.ratio};
  margin-right: ${props => (props.mr ? "25px" : "0px")};
  margin-left: ${props => (props.ml ? "25px" : "0px")};
  margin-top: ${props => (props.mt ? "25px" : "0px")};
  margin-bottom: ${props => (props.mb ? "25px" : "0px")};
`;

/** type이 true이면 purple이 왼쪽, false이면 오른쪽 */
function CarouselDiv(props: any) {
  return (
    <WrapperDiv ratio={props.ratio} mr={props.mr}>
      {NameDiv(props)}
      <ContentDiv>{props.data}</ContentDiv>
    </WrapperDiv>
  );
}

export default CarouselDiv;
