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
const Selected = styled(IdolImage)<SelectedIdolType>`
  position: relative;
  &:hover {
    transform: none;
    cursor: default;
  }
`;
const NotSelected = styled(IdolImage)<SelectedIdolType>`
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
  width: 100%;
  display: flex;
  justify-content: center
`
/** 전체 아이돌 */
const IdolSection = styled.div`
  overflow-y: scroll;
  width: 100%;
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


export { IdolGrid, IdolImage, NotSelected, Selected, SelectedSection, IdolSection };