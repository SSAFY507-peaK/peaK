import { useEffect, useRef, useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
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
  padding: 5px 10px 10px 10px;
  position: absolute;
  top: 33px;
  left: 5px;
`;

const SearchResultDiv = styled.div`
  cursor: pointer;
  font-size: 13px;
  padding: 7px 0px;
  border-bottom: 0.5px solid #dddddd;
`;

function Search({ width }: WrapperType) {
  const [search, setSearch] = useState("");

  const onChange = (e: any) => {
    console.log(search);
    setSearch(e.target.value);
  };

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
    <SearchDiv>
      <Wrapper width={width}>
        <SearchInput placeholder="아이돌 이름을 입력해주세요" value={search} onChange={onChange} />
        <SearchIcon sx={{ color: "var(--gray600-color)" }} />
      </Wrapper>
      {search !== "" && (
        <SearchAllResult>
          {filterIdol.map(idol => (
            <SearchResultDiv
              onClick={e => {
                e.preventDefault();
                alert(idol.name);
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
