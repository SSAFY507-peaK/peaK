import React from 'react';
import styled from "styled-components";

const IdolImageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const IdolImage = styled.div<{ url?: string, width?: string }>`
  width: ${props => props.width? props.width : "150px"};
  aspect-ratio: 1;
  background-image: url(${props => props.url || "none"});
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  transition: transform 100ms ease-in-out;
  &:hover {
    transform: scale(1.05, 1.05);
    cursor: pointer;
  }
  &.selected{
    :after{
      content: "✔";
      height: 100%;
      width: 100%;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 3rem;
      color: var(--purple600-color);
      background-color: rgba(0, 0, 0, 0.5);
    }
    box-shadow: 0 0 10px -2px var(--purple300-color);
  }
`;
const IdolName = styled.div`
  margin-top: 7px;
  font-weight: bold;
  text-align: center;
`

type IdolImgNameContainerProps = {
  idol: string,
  width?: string,
  url: string,
  className: string,
  onClick: (idol: string) => void,
}
function IdolImgNameContainer({idol, width, url, className, onClick }: IdolImgNameContainerProps) {

  return (
    <IdolImageWrapper onClick={() => onClick(idol) }>
      <IdolImage width={width} url={url} className={className} />
      <IdolName>{ idol }</IdolName>
    </IdolImageWrapper>
  );
}

export default React.memo(IdolImgNameContainer);