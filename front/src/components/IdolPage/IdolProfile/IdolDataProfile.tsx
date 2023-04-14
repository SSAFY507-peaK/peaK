
import IdolDataProfileSns from './IdolDataProfileSns';
import { IdolNameProps } from "../../../routes/IdolPage";
import styled from "styled-components";


interface ImageType {
  backgroundImg: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0.5;
  width: 100%;
  padding: 30px;
`;

const ProfileImg = styled.div<ImageType>`
  border-radius: 80px;
  width: 200px;
  height: 200px;
  background-image: url(${props => props.backgroundImg});
  background-color: aqua;
  background-size: cover;
  background-position: center;
  margin: 30px;
  box-shadow: 0 0 10px -1px rgba(151, 151, 151, 0.25);
`;


function IdolDataProfile ({idolName}: IdolNameProps) {
  const DOMAIN = process.env.REACT_APP_BASE_URL
  return (
    <Wrapper>
      <ProfileImg backgroundImg= { `${DOMAIN}/img/${encodeURIComponent(idolName)}.webp`} />
      <IdolDataProfileSns/>
    </Wrapper>
  )
}

export default IdolDataProfile;