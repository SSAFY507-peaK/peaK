import IdolChat from "./IdolChat";
import IdolDataProfile from "./IdolDataProfile";
import styled from "styled-components";

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 25px;
  flex: 0.35;
`;

function IdolData() {
  return (
    <Frame>
      <IdolDataProfile />
      <IdolChat />
    </Frame>
  )
}

export default IdolData;