import styled from "styled-components";

interface DataProps {
  isTab: boolean;
  title: string;
  size: string;
  onClick: () => void;
}

interface TabType {
  size: string;
}

const ChartTabOn = styled.div<TabType>`
  background-color: var(--purple800-color);
  font-size: ${props => props.size};
  font-weight: 300;
  border-radius:20px;
  padding-left: 30px;
  padding-right: 30px;
  cursor: pointer;
`;

const ChartTabOff = styled.div<TabType>`
  font-size: ${props => props.size};
  font-weight: 300;
  border-radius:20px;
  padding-left: 30px;
  padding-right: 30px;
  cursor: pointer;
`;

/** Tab 활성화 */
function TabComponent({isTab, title, size, onClick} : DataProps) {
  if (isTab){
    return (<ChartTabOn size={size} onClick={onClick}>{title}</ChartTabOn>)
  } else {
    return (<ChartTabOff size={size} onClick={onClick}>{title}</ChartTabOff>)
  }
}

export default TabComponent;