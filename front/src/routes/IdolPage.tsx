import { Link, useParams } from "react-router-dom";

import IdolData from "../components/idolpage/IdolProfile/IdolData";
import IdolEmotion from "../components/idolpage/idolemotion/IdolEmotion";
import IdolKeyword from "../components/idolpage/idolkeyword/IdolKeyword";
import IdolList from "../components/idolpage/IdolList";
import IdolYoutube from "../components/idolpage/IdolYoutube";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const TopFrame = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
`;

const TopLeftFrame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.7;
  margin-right: 15px;
`;


const BottomFrame = styled.div`
`;

function IdolPage() {
  const params = useParams();
  const idolName = params.idolName;
  
  return (
    <Wrapper>
      <IdolList />
      <TopFrame>
        <IdolData />
        <TopLeftFrame>
          <IdolEmotion />
          <IdolKeyword />
        </TopLeftFrame>
      </TopFrame>
      <BottomFrame>
        <IdolYoutube />
      </BottomFrame>
    </Wrapper>
  );
}

export default IdolPage;
