import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

interface WrapperType {
  width?: string;
}

const Wrapper = styled.div<WrapperType>`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #d9d9d9;
  background-color: white;
  border-radius: 20px;
  padding: 3px 10px;
  height: 33px;
  width: ${props => props.width || "300px"};
`;

const SearchInput = styled.input`
  width: 100%;
  font-size: 13px;
`;

function Search() {
  return (
    <Wrapper>
      <SearchInput placeholder="아이돌 이름을 입력해주세요" />
      <SearchIcon sx={{ opacity: "0.6" }} />
    </Wrapper>
  );
}

export default Search;
