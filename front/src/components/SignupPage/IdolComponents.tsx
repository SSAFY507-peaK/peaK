import styled from "styled-components";

const IdolGrid = styled.div<{cols: number}>`
  display: grid;
  //grid-template-columns: repeat(6, 1fr);
  grid-template-columns: repeat(${props => props.cols}, 1fr);
  gap: 15px;
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
  
`;
const IdolName = styled.div`
  margin-top: 5px;
  font-weight: bold;
  text-align: center;
`
const Selected = styled(IdolImage)`
  width: 100px;
  height: 100px;
  background-color: black;
  
  position: relative;
`;
const EmptySelected = styled(IdolImage)`
  width: 100px;
  height: 100px;
  background: transparent;
  border: 2px dashed var(--gray700-color);
`;

export { IdolGrid, IdolImage, IdolName, IdolImageWrapper, EmptySelected, Selected };