import { Link, useParams } from "react-router-dom";

import IdolData from "../components/idolpage/IdolData";
import IdolEmotion from "../components/idolpage/IdolEmotion";
import IdolKeyword from "../components/idolpage/IdolKeyword";
import IdolYoutube from "../components/idolpage/IdolYoutube";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopFrame = styled.div`
  display: flex;
  flex-direction: row;
`;

const TopLeftFrame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.6;
  margin-right: 15px;
`;


const BottomFrame = styled.div`
`;

function IdolPage() {
  const params = useParams();
  const idolName = params.idolName;
  
  return (
    <Wrapper>
      <TopFrame>
        <TopLeftFrame>
          <IdolEmotion />
          <IdolKeyword />
        </TopLeftFrame>
        <IdolData />
      </TopFrame>
      <BottomFrame>
        <IdolYoutube />
      </BottomFrame>
    </Wrapper>
  );
}

export default IdolPage;
