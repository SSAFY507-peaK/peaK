import styled from "styled-components";
import { IdolNameProps } from "../../routes/IdolPage";
import {useRef, useState} from "react";
import UseOnClickOutside from "../../_hooks/useOnClickOutside";
import {useAppSelector} from "../../_hooks/hooks";
import {useNavigate} from "react-router-dom";
import { ReactComponent as ArrowDown} from "../../assets/arrow-down.svg"

const IdolListFrame = styled.div`
  width: auto;
  position: relative;
`;

const IdolTitle = styled.h2`
  
  display: inline-flex;
  align-items: center;
  :hover{
    cursor: pointer
  }
`
const IdolListDropDown = styled.div`
  width: 200px;
  height: auto;
  background-color: white;
  box-shadow: 0 0 10px -2px #cfcdcd;
  padding: 5px 10px 10px 10px;
  border-radius: 5px;
  position: absolute;
  top: 40px;
`
const IdolDesc = styled.div`
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  padding: 10px 8px;
  border-bottom: 0.5px solid #dddddd;
`
const IdolDiv = styled.div`
  cursor: pointer;
  font-size: 13px;
  padding: 10px 8px;
  &:hover {
    font-weight: bold;
  }
  border-bottom: 0.5px solid #dddddd;
  :last-child {
    border-bottom: none;
    padding: 10px 8px 5px 8px;
  }
`



function IdolList({ idolName }: IdolNameProps) {
  const favIdols = useAppSelector(state => state.myInterest.idols.map(idol => idol.idol));
  console.log(favIdols);
  const [isClicked, setIsClicked] = useState(false);
  const DropDownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();


  const SVGstyle = {
    width: "24px",
    fill: "var(--purple500-color)",
    transition: "transform 100ms ease-in",
    // isClicked ?
    //   transform: "scaleX(90)" : null
  }

  const onClick = () => {
    setIsClicked(prev => !prev);
  };
  UseOnClickOutside(DropDownRef, () => {
    setIsClicked(false);
  });

  return (
    <IdolListFrame >
      <IdolTitle onMouseUp={onClick}>{idolName}<ArrowDown style={SVGstyle}  /></IdolTitle>
      { isClicked &&
        <IdolListDropDown ref={DropDownRef}>
          <IdolDesc>좋아하는 아이돌</IdolDesc>
          { favIdols.map(idol => <IdolDiv onClick={() => {
            setIsClicked(false);
            navigate(`/${idol}`)
          }}>{idol}</IdolDiv>) }
        </IdolListDropDown>
      }
    </IdolListFrame>
  )
}

export default IdolList;