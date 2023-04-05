import { useEffect, useRef, useState } from "react";

import { IdolLists } from "../_utils/loader";
import { IdolListsType } from "../_utils/Types";
import SearchIcon from "@mui/icons-material/Search";
import UseOnClickOutside from "../_hooks/useOnClickOutside";
import styled from "styled-components";
import { useLoaderData } from "react-router";
import { useNavigate } from "react-router";

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
  const idolLists = useLoaderData() as IdolListsType;
  const navigate = useNavigate();

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
  const idols = idolLists.idols;

  const filterIdol = idols.filter(idol => {
    return idol.toLocaleLowerCase().includes(search.toLocaleLowerCase());
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
                navigate(`/${idol}`);
                setSearch("");
              }}
            >
              {idol}
            </SearchResultDiv>
          ))}
        </SearchAllResult>
      )}
    </SearchDiv>
  );
}

export default Search;
