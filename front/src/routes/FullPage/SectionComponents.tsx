import styled from 'styled-components';

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  
  img {
    width: 50%
  }
`

export { TextSection, ImageSection }