import styled from "styled-components";

type IdolGridType = {
  cols: number;
  gap?: string;
}
const IdolGrid = styled.div<IdolGridType>`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(${props => props.cols}, 1fr);
  gap: ${props => props.gap || "15px"};
`;

const IdolImageWrapper = styled.div`
  width: 150px;
  height: 180px;
  display: flex;
  flex-direction: column;

`;

const IdolImage = styled.div<{ url?: string }>`
  width: 150px;
  height: 150px;
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center;
  border-radius: 50%;

  transition: transform 100ms ease-in-out;
  &:hover {
    transform: scale(1.05, 1.05);
    cursor: pointer;
  }

`;
const IdolName = styled.div`
  margin-top: 7px;
  font-weight: bold;
  text-align: center;
`
const Selected = styled(IdolImage)`
  width: 100px;
  height: 100px;
  //background-color: black;
  
  position: relative;
`;
const EmptySelected = styled(IdolImage)`
  width: 100px;
  height: 100px;
  background: transparent;
  border: 2px dashed var(--gray700-color);

  &:hover {
    transform: none;
    cursor: default;
  }
`;

export { IdolGrid, IdolImage, IdolName, IdolImageWrapper, EmptySelected, Selected };