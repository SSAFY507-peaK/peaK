import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const IdolName = styled.div`
  
`
const IdolRank = styled.div`
  
`

function IdolData () {
  return (
    <Wrapper>
      <LeftBox>
        <IdolName>세븐틴</IdolName>
        <FavoriteIcon sx={{ color: "red" }} />
        <FavoriteBorderIcon />
        <IdolRank>2위</IdolRank>
      </LeftBox>
      <RightBox>
        <InstagramIcon />
        <TwitterIcon sx={{ color: "blue" }} />
        <YouTubeIcon sx={{ color: "red" }} />
      </RightBox>
    </Wrapper>
  )
}

export default IdolData;