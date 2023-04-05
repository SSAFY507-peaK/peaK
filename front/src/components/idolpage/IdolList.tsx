import styled from "styled-components";
import { IdolNameProps } from "../../routes/IdolPage";

const IdolListFrame = styled.div`

`;

function IdolList({ idolName }: IdolNameProps) {
  return (
    <IdolListFrame>
      <h2 style={{ margin: "0px"}}>{idolName}</h2>
    </IdolListFrame>
  )
}

export default IdolList;