import { Link, useParams } from "react-router-dom";

import IdolEmotion from "../components/idolpage/IdolEmotion";
import IdolKeyword from "../components/idolpage/IdolKeyword";
import IdolProfile from "../components/idolpage/IdolProfile";
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
        <IdolProfile />
      </TopFrame>
      <BottomFrame>
        <IdolYoutube />
      </BottomFrame>
    </Wrapper>
  );
}

export default IdolPage;
