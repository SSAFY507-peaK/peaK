import { DeleteFavIdols, UpdateFavIdols } from '../../../_store/slices/UserSlice';
import { useAppDispatch, useAppSelector } from '../../../_hooks/hooks';
import { useEffect, useState } from "react";

import { ClickTracker } from '../../../_utils/UserTracker';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InstagramIcon from '@mui/icons-material/Instagram';
import { SnsLink } from '../../../_utils/Types';
import TwitterIcon from '@mui/icons-material/Twitter';
import { UpdateIdolInterest } from "../../../_store/slices/IdolDetailSnsSlice";
import YouTubeIcon from '@mui/icons-material/YouTube';
import { request } from '../../../_utils/axios';
import styled from "styled-components"
import { useParams } from 'react-router';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
  justify-content: space-evenly;
  margin-bottom: 20px;
`;

const SnsFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IconFrame = styled.div`
  display: flex;
  background-color: ${props => props.color || `var(--purple800-color)` };
  border-radius: 5px;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const IconText = styled.div`
  text-align: center;
  font-size: 0.7rem;
`;


function IdolDataProfileSns() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const idolName:string = params.idolName || "";
  const idolSnsList = useAppSelector(state => state.idolDetailSns)
  const userId:string = useAppSelector(state => state.userInfo.userId)
  const TOKEN = useAppSelector(state => state.userInfo.TOKEN);

  const headers = {Authorization: TOKEN}
  const interest = idolSnsList.interest
  const snsLink:SnsLink = idolSnsList.snsLink
  const [like, setLike] = useState<boolean>(interest);

  useEffect(() => {
    setLike(interest)
  },[])

  return (
    <Wrapper>
      <SnsFrame>
        <IconFrame>
          <InstagramIcon 
            sx={{ fontSize: "1.3rem", cursor: "pointer", color: `var(--purple500-color)` }}
            onClick={()=> {
              window.open(snsLink.instagram)
              ClickTracker(idolName, userId)
            }}
          />
        </IconFrame>
        <IconText>인스타</IconText>
      </SnsFrame>
      <SnsFrame>
        <IconFrame>
          <TwitterIcon 
            sx={{ fontSize: "1.3rem", cursor: "pointer", color: `var(--purple500-color)` }} 
            onClick={()=> {
              window.open(snsLink.twitter)
              ClickTracker(idolName, userId)
          }} />
        </IconFrame>
        <IconText>트위터</IconText>
        </SnsFrame>
        <SnsFrame>
        <IconFrame>
        <YouTubeIcon 
          sx={{ fontSize: "1.3rem", cursor: "pointer", color: `var(--purple500-color)` }}
          onClick={()=> {
            window.open(snsLink.youtube)
            ClickTracker(idolName, userId)
          }} />
        </IconFrame>
        <IconText>유튜브</IconText>
        </SnsFrame>
        <SnsFrame>
        <IconFrame color="#FDD8D8" >
        {
          like === true?
          <FavoriteIcon 
            sx={{ fontSize: "1.3rem", cursor: "pointer", color: `var(--red600-color)` }} 
            onClick={() => {
              setLike(false)
              ClickTracker(idolName, userId)
              request("post", `/interest/${idolName}/hate`,"", headers).then(res => dispatch(UpdateIdolInterest(interest)))
              dispatch(DeleteFavIdols(idolName))
            }} />
          :
          <FavoriteBorderIcon 
            sx={{ fontSize: "1.3rem", cursor: "pointer", color: `var(--red600-color)` }} 
            onClick={() => {
              setLike(true)
              ClickTracker(idolName, userId)
              request("post", `/interest/${idolName}/love`,"", headers).then(res => dispatch(UpdateIdolInterest(interest)))
              dispatch(UpdateFavIdols(idolName))
            }}/>
        } 
        </IconFrame>
        <IconText>팔로잉</IconText>
      </SnsFrame>
    </Wrapper>  )
}

export default IdolDataProfileSns;
