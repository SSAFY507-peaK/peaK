
import styled from "styled-components";
import bg  from "../sampleImg/Rectangle 343.png"
import IdolDataProfileSns from './IdolDataProfileSns';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0.5;
  padding: 15px;
  width: 100%;
`;

const TopFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ProfileImg = styled.div`
  border-radius: 30px;
  margin: 10px;
  width: 200px;
  height: 200px;
  background-image: url(${bg});
  background-color: aqua;
  background-size: cover;
`;

const IdolName = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 30px;
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: row;
`;

// const IdolRank = styled.div`
//   font-size: 1.6rem;
//   font-weight: 700;
//   opacity: 0.5;
// `;

function IdolDataProfile () {
  return (
    <Wrapper>
      <TopFrame>
        <ProfileImg />
        <IdolName>세븐틴</IdolName>
        {/* <IdolRank>2위</IdolRank> */}
        <IdolDataProfileSns />
      </TopFrame>
      <RightBox>
      </RightBox>
    </Wrapper>
  )
}

export default IdolDataProfile;