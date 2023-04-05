import IdolChat from "./IdolChat";
import IdolDataProfile from "./IdolDataProfile";
import styled from "styled-components";
import { IdolNameProps } from "../../../routes/IdolPage";

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 25px;
  flex: 0.35;
`;

function IdolData({ idolName }: IdolNameProps) {
  return (
    <Frame>
      <IdolDataProfile idolName={idolName} />
      <IdolChat />
    </Frame>
  )
}

export default IdolData;