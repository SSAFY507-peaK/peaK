import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import styled from "styled-components"
import { useState } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: space-evenly;
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
  border-radius: 10px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const IconText = styled.div`
  text-align: center;
  font-size: 0.8rem;
`;


function IdolDataProfileSns() {
  const [like, setLike] = useState<boolean>(false);
  let instagramUrl : string = "https://www.instagram.com/saythename_17/";
  let twitterUrl: string = "https://twitter.com/pledis_17?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor";
  let youtubeUrl: string = "https://www.youtube.com/user/pledis17/videos?app=desktop";

  return (
    <Wrapper>
      <SnsFrame>
        <IconFrame>
          <InstagramIcon sx={{ fontSize: "1.5rem", cursor: "pointer", color: `var(--purple500-color)` }} onClick={()=> window.open(instagramUrl)} />
        </IconFrame>
        <IconText>인스타그램</IconText>
      </SnsFrame>
      <SnsFrame>
        <IconFrame>
          <TwitterIcon sx={{ fontSize: "1.5rem", cursor: "pointer", color: `var(--purple500-color)` }} onClick={()=> window.open(twitterUrl)} />
        </IconFrame>
        <IconText>트위터</IconText>
        </SnsFrame>
        <SnsFrame>
        <IconFrame>
        <YouTubeIcon sx={{ fontSize: "1.5rem", cursor: "pointer", color: `var(--purple500-color)` }} onClick={()=> window.open(youtubeUrl)} />
        </IconFrame>
        <IconText>유튜브</IconText>
        </SnsFrame>
        <SnsFrame>
        <IconFrame color="#FDD8D8" >
        {
          like?
          <FavoriteIcon sx={{ fontSize: "1.5rem", cursor: "pointer", color: `var(--red600-color)` }} onClick={() => setLike(false)} />
          :
          <FavoriteBorderIcon sx={{ fontSize: "1.5rem", cursor: "pointer", color: `var(--red600-color)` }} onClick={() => setLike(true)}/>
        } 
        </IconFrame>
        <IconText>팔로잉</IconText>
      </SnsFrame>
    </Wrapper>  )
}

export default IdolDataProfileSns;