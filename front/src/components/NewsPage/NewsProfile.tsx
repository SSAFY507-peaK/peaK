import styled from "styled-components";

interface NewsProfileType {
  url: string;
  width: string;
  height: string;
}

const NewsProfile = styled.div<NewsProfileType>`
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center;
  width: ${props => props.width};
  height: ${props => props.height};
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

export default NewsProfile;
