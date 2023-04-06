import styled from "styled-components";
import { IdolNameProps } from "../../routes/IdolPage";
import { useRef, useState} from "react";
import UseOnClickOutside from "../../_hooks/useOnClickOutside";
import {useNavigate} from "react-router-dom";
import { ReactComponent as ArrowDown} from "../../assets/arrow-down.svg"
import {useAppSelector} from "../../_hooks/hooks";

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
  const [isClicked, setIsClicked] = useState(false);
  const DropDownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const favIdols = useAppSelector(state => state.userInfo.favIdols);


  const SVGStyle = {
    width: "24px",
    fill: "var(--purple500-color)",
    transition: "transform 200ms ease-in",
    transform: isClicked ? "rotate(180deg)" : "rotate(0)",
  }

  const handleOnClick = () => {
    // console.log("클릭");
    setIsClicked(prev => !prev);
  }

  UseOnClickOutside(DropDownRef, () => {
    setIsClicked(false);
  });

  return (
    <IdolListFrame >
      <IdolTitle onClick={handleOnClick}> {idolName}<ArrowDown style={SVGStyle} /> </IdolTitle>
      { isClicked &&
        <IdolListDropDown ref={DropDownRef}>
          <IdolDesc>좋아하는 아이돌</IdolDesc>
          { favIdols?.map(idol => <IdolDiv onClick={() => {
            setIsClicked(false);
            navigate(`/${idol}`)
          }}>{idol}</IdolDiv>) }
        </IdolListDropDown>
      }
    </IdolListFrame>
  )
}

export default IdolList;