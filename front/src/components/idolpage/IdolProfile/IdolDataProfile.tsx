import IdolDataProfileSns from './IdolDataProfileSns';
import bg  from "../sampleImg/Rectangle343.png"
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0.5;
  padding: 15px;
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


// const IdolRank = styled.div`
//   font-size: 1.6rem;
//   font-weight: 700;
//   opacity: 0.5;
// `;

function IdolDataProfile () {
  return (
    <Wrapper>
        <ProfileImg />
        <IdolName>세븐틴</IdolName>
        {/* <IdolRank>2위</IdolRank> */}
        <IdolDataProfileSns />
    </Wrapper>
  )
}

export default IdolDataProfile;