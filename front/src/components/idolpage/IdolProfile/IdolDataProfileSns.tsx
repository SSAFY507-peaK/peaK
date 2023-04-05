import { ClickTracker } from '../ClickTracker';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import styled from "styled-components"
import { useParams } from 'react-router';
import { useState } from "react";

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
  let instagramUrl : string = "https://www.instagram.com/saythename_17/";
  let twitterUrl: string = "https://twitter.com/pledis_17?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor";
  let youtubeUrl: string = "https://www.youtube.com/user/pledis17/videos?app=desktop";
  const params = useParams();
  const idolName:string = params.idolName || "";
  const [like, setLike] = useState<boolean>(false);
  return (
    <Wrapper>
      <SnsFrame>
        <IconFrame>
          <InstagramIcon 
            sx={{ fontSize: "1.3rem", cursor: "pointer", color: `var(--purple500-color)` }}
            onClick={()=> {
              window.open(instagramUrl)
              ClickTracker(idolName,"chohm1223@naver.com")
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
              window.open(twitterUrl)
              ClickTracker(idolName,"chohm1223@naver.com")
          }} />
        </IconFrame>
        <IconText>트위터</IconText>
        </SnsFrame>
        <SnsFrame>
        <IconFrame>
        <YouTubeIcon 
          sx={{ fontSize: "1.3rem", cursor: "pointer", color: `var(--purple500-color)` }}
          onClick={()=> {
            window.open(youtubeUrl)
            ClickTracker(idolName,"chohm1223@naver.com")
        }} />
        </IconFrame>
        <IconText>유튜브</IconText>
        </SnsFrame>
        <SnsFrame>
        <IconFrame color="#FDD8D8" >
        {
          like?
          <FavoriteIcon sx={{ fontSize: "1.3rem", cursor: "pointer", color: `var(--red600-color)` }} onClick={() => setLike(false)} />
          :
          <FavoriteBorderIcon sx={{ fontSize: "1.3rem", cursor: "pointer", color: `var(--red600-color)` }} onClick={() => setLike(true)}/>
        } 
        </IconFrame>
        <IconText>팔로잉</IconText>
      </SnsFrame>
    </Wrapper>  )
}

export default IdolDataProfileSns;