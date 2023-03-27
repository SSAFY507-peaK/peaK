import IdolChat from "./IdolChat";
import IdolDataProfile from "./IdolDataProfile";
import styled from "styled-components";

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  flex: 0.4;
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