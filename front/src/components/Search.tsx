import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

type WrapperType = {
  width?: string;
}

const Wrapper = styled.div<WrapperType>`
  position: relative;
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
`;

function Search({width}: WrapperType) {
  return (
    <Wrapper width={width}>
      <SearchInput placeholder="아이돌 이름을 입력해주세요" />
      <SearchIcon sx={{ color: "var(--gray600-color)" }} />
    </Wrapper>
  );
}

export default Search;
