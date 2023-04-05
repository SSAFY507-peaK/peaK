import { Link, useParams } from "react-router-dom";

import IdolData from "../components/idolpage/IdolProfile/IdolData";
import IdolEmotion from "../components/idolpage/idolemotion/IdolEmotion";
import IdolKeyword from "../components/idolpage/idolkeyword/IdolKeyword";
import IdolList from "../components/idolpage/IdolList";
import IdolYoutube from "../components/idolpage/IdolYoutube";
import { TimeTracker } from "../components/idolpage/ClickTracker";
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

const TopRightFrame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.65;
  margin-right: 15px;
`;

const BottomFrame = styled.div`
`;

function IdolPage() {
  const params = useParams();
  const idolName = params.idolName;
  TimeTracker(`/${idolName}`)
  return (
    <Wrapper>
      <IdolList />
      <TopFrame>
        <IdolData />
        <TopRightFrame>
          <IdolEmotion />
          <IdolKeyword />
        </TopRightFrame>
      </TopFrame>
      <BottomFrame>
        <IdolYoutube />
      </BottomFrame>
    </Wrapper>
  );
}

export default IdolPage;
