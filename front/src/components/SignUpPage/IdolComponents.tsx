import styled from "styled-components";

type IdolGridType = {
  cols: number;
  gap?: string;
}
type SelectedIdolType = {
  height?: string;
}
const IdolGrid = styled.div<IdolGridType>`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(${props => props.cols}, 1fr);
  gap: ${props => props.gap || "15px"};
`;

const IdolImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IdolName = styled.div`
  margin-top: 7px;
  font-weight: bold;
  text-align: center;
`
const IdolImage = styled.div<{ url?: string, height?: string, width?: string }>`
  height: ${props => props.height? props.height : "150px"};
  width: ${props => props.height? props.height : "150px"};
  background-image: url(${props => props.url});
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
      display: flex;
      height: 100%;
      width: 100%;
      border-radius: 50%;
      justify-content: center;
      align-items: center;
      font-size: 3rem;
      color: var(--purple600-color);
      background-color: rgba(0, 0, 0, 0.5);
    }
    box-shadow: 0 0 10px -2px var(--purple300-color);
  }
`;
const Selected = styled(IdolImage)<SelectedIdolType>`
  height: ${props => props.height? props.height : "150px"};
  width: ${props => props.height? props.height : "150px"};
  position: relative;
`;
const EmptySelected = styled(IdolImage)<SelectedIdolType>`
  height: ${props => props.height? props.height : "150px"};
  width: ${props => props.height? props.height : "150px"};
  background: transparent;
  border: 2px dashed var(--gray700-color);
  &:hover {
    transform: none;
    cursor: default;
  }
`;

/** 내가 선택한 아이돌 */
const SelectedSection = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: center
`
/** 전체 아이돌 */
const IdolWrapper = styled.div`
  overflow-y: scroll;
  width: 960px;
  padding: 15px;
  &::-webkit-scrollbar {
    width: 7px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.8);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: var(--gray700-color);
  }
`


export { IdolGrid, IdolImage, IdolName, IdolImageWrapper, EmptySelected, Selected, SelectedSection, IdolWrapper };