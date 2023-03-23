import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import styled from "styled-components";
import { useState } from 'react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const IdolName = styled.div`
  font-size: 3rem;
  font-weight: 700;
`;

const IdolRank = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  opacity: 0.5;
`;

function IdolDataProfile () {
  const [like, setLike] = useState<boolean>(false);
  let instagramUrl : string = "https://www.instagram.com/saythename_17/";
  let twitterUrl: string = "https://twitter.com/pledis_17?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor";
  let youtubeUrl: string = "https://www.youtube.com/user/pledis17/videos?app=desktop";


  return (
    <Wrapper>
      <LeftBox>
        <IdolName>세븐틴</IdolName>
        {
          like?
          <FavoriteIcon sx={{ color: "red", fontSize: "3rem", cursor: "pointer" }} onClick={() => setLike(false)} />
          :
          <FavoriteBorderIcon sx={{ color: "red", fontSize: "3rem", cursor: "pointer" }} onClick={() => setLike(true)}/>
        } 
        <IdolRank>2위</IdolRank>
      </LeftBox>
      <RightBox>
        <InstagramIcon sx={{ fontSize: "2.5rem", cursor: "pointer" }} onClick={()=> window.open(instagramUrl)} />
        <TwitterIcon sx={{ fontSize: "2.5rem", cursor: "pointer", color: "blue" }} onClick={()=> window.open(twitterUrl)} />
        <YouTubeIcon sx={{ fontSize: "2.5rem", cursor: "pointer", color: "red" }} onClick={()=> window.open(youtubeUrl)} />
      </RightBox>
    </Wrapper>
  )
}

export default IdolDataProfile;