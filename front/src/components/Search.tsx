import { useLoaderData, useNavigate } from "react-router";
import { useRef, useState } from "react";

import { IdolListsType } from "../_utils/Types";
import { ResetDetailNews } from "../_store/slices/IdolDetailNewsSlice";
import { ResetWordCount } from "../_store/slices/IdolDetailWordCountSlice";
import SearchIcon from "@mui/icons-material/Search";
import UseOnClickOutside from "../_hooks/useOnClickOutside";
import styled from "styled-components";
import { useAppDispatch } from "../_hooks/hooks";

type WrapperType = {
  width?: string;
};

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

const SearchDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const SearchAllResult = styled.div`
  width: 95%;
  background-color: white;
  box-shadow: 0 0 10px -2px #cfcdcd;
  padding: 5px 10px 10px 10px;
  border-radius: 5px;
  position: absolute;
  top: 33px;
  left: 5px;
  max-height: 300px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.8);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: var(--gray700-color);
  }
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

type SearchInputDivProps = {
  handleSearchIdol: (value: React.ChangeEvent<HTMLInputElement>) => void;
};
function SearchInputDiv({ handleSearchIdol }: SearchInputDivProps) {
  return (
    <Wrapper style={{ flexShrink: "0" }}>
      <SearchInput onChange={e => handleSearchIdol(e)} placeholder="아이돌 이름을 입력해주세요" />
      <SearchIcon sx={{ color: "var(--gray600-color)" }} />
    </Wrapper>
  );
}

function SearchList({ width }: WrapperType) {
  const searchRef = useRef<any>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // 검색창에 입력한 데이터
  const [search, setSearch] = useState("");

  // 검색창이 클릭되었는지 여부(클릭된 경우가 true)
  const [isClicked, setIsClicked] = useState(false);

  // 전체 아이돌 리스트(검색창에 검색할 때 필요)
  const idolLists = useLoaderData() as IdolListsType;
  const idols = idolLists.idols;

  // 검색창에 검색 내용 실시간 반영
  const onChange = (e: any) => {
    setSearch(e.target.value);
    setIsClicked(true);
  };

  // 검색창 클릭 시 isClicked를 true로
  const onClick = () => {
    setIsClicked(true);
  };

  // 검색창 밖 클릭 시 isClicked를 false로
  UseOnClickOutside(searchRef, () => {
    setIsClicked(false);
  });

  // 검색 내용이 포함된 아이돌을 idolLists에서 추출
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
      {/* 검색창이 빈칸이 아니고, isClicked가 true이며 filterIdol이 존재한다면 검색창 띄우기 */}
      {search !== "" && isClicked && (
        <SearchAllResult>
          {filterIdol.map(idol => (
            <SearchResultDiv
              onClick={e => {
                e.preventDefault();
                dispatch(ResetDetailNews())
                dispatch(ResetWordCount())
                // 클릭 시 해당 아이돌 상세 페이지로 이동
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

export { SearchList, SearchInputDiv };
