import IdolDataProfileSns from './IdolDataProfileSns';
import styled from "styled-components";
import { IdolNameProps } from "../../../routes/IdolPage";
import { useAppDispatch, useAppSelector } from '../../../_hooks/hooks';
import { request } from '../../../_utils/axios';
import { CreateIdolSns } from '../../../_store/slices/IdolDetailSnsSlice';
import { UserInfo } from '../../../_utils/Types';
// import { useParams } from 'react-router';

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
  const dispatch = useAppDispatch()  
  const userInfo:UserInfo = useAppSelector(state => state.userInfo)
  const headers = {Authorization:userInfo.TOKEN }
  
  request("get", `/idol/${idolName}`,"", headers).then(res => dispatch(CreateIdolSns(res)))
  const DOMAIN = process.env.REACT_APP_BASE_URL
  return (
    <Wrapper>
      <ProfileImg backgroundImg= { `${DOMAIN}/img/${encodeURIComponent(idolName)}.webp`} />
      <IdolDataProfileSns/>
    </Wrapper>
  )
}

export default IdolDataProfile;