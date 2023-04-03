import { useEffect, useRef, useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import UseOnClickOutside from "../_hooks/useOnClickOutside";
import styled from "styled-components";

type WrapperType = {
  width?: string;
};

const SearchDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Wrapper = styled.div<WrapperType>`
  display: flex;
  align-items: center;
  border: 1px solid var(--gray700-color);
  background-color: white;
  border-radius: 20px;
  padding-right: 7px;
  height: 33px;
  width: ${props => props.width || "300px"};
`;

const SearchInput = styled.input`
  width: 100%;
  margin: 3px 10px;
  font-size: 13px;
  color: var(--gray200-color);
  &::placeholder {
    color: var(--gray600-color);
  }
`;

const SearchAllResult = styled.div`
  width: 95%;
  background-color: white;
  box-shadow: 0px 0px 10px -2px #cfcdcd;
  padding: 5px 10px 10px 10px;
  position: absolute;
  top: 33px;
  left: 5px;
`;

const SearchResultDiv = styled.div`
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
`;

function Search({ width }: WrapperType) {
  const [search, setSearch] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const searchRef = useRef<any>();

  const onChange = (e: any) => {
    console.log(search);
    setSearch(e.target.value);
    setIsClicked(true);
  };

  const onClick = (e: any) => {
    setIsClicked(true);
  };

  UseOnClickOutside(searchRef, () => {
    setIsClicked(false);
  });

  const idols = [
    { name: "세븐틴" },
    { name: "세꼬시" },
    { name: "재산세" },
    { name: "설날세배" },
    { name: "Exo" },
    { name: "트와이스" },
    { name: "아이브" },
    { name: "있지" },
    { name: "(아이들)" },
    { name: "뉴진스" },
    { name: "BTS" },
  ];

  const filterIdol = idols.filter(idol => {
    return idol.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });

  return (
    <SearchDiv ref={searchRef}>
      <Wrapper width={width}>
        <SearchInput
          placeholder="아이돌 이름을 입력해주세요"
          value={search}
          onChange={onChange}
          onClick={onClick}
        />
        <SearchIcon sx={{ color: "var(--gray600-color)" }} />
      </Wrapper>
      {search !== "" && isClicked && (
        <SearchAllResult>
          {filterIdol.map(idol => (
            <SearchResultDiv
              onClick={e => {
                e.preventDefault();
                alert(idol.name);
                setSearch("");
              }}
            >
              {idol.name}
            </SearchResultDiv>
          ))}
        </SearchAllResult>
      )}
    </SearchDiv>
  );
}

export default Search;
