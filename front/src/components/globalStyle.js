import { createGlobalStyle } from "styled-components";

// react icons 스타일
const iconStyle = {
  verticalAlign: "middle",
  color: "var(--icon-color)",
  fontSize: "1.3rem",
  cursor: "pointer",
};

const GlobalStyle = createGlobalStyle`
  :root {
    /* Color */
    --gray800-color: #EBEBEB;
    --gray700-color: #D1D1D1;
    --gray600-color: #B8B8B8;
    --gray500-color: #9E9E9E;
    --gray400-color: #858585;
    --gray300-color: #6B6B6B;
    --gray200-color: #525252;
    --gray100-color: #383838;
    
    --white800-color: #FCF8F8;
    --white700-color: #EBD6D6;
    --white600-color: #DAB4B4;
    --white500-color: #C58B8B;
    --white400-color: #B46969;
    --white300-color: #9C4E4E;
    --white200-color: #7A3D3D;
    --white100-color: #582C2C;

    --yellow800-color: #FFEDD1;
    --yellow700-color: #FFD99E;
    --yellow600-color: #FFC56C;
    --yellow500-color: #FFB038;
    --yellow400-color: #FF9C05;
    --yellow300-color: #D17E00;
    --yellow200-color: #9E5F00;
    --yellow100-color: #6B4100;
    
    --red800-color: #FDD8D8;
    --red700-color: #FCA7A7;
    --red600-color: #FA7474;
    --red500-color: #F84444;
    --red400-color: #F61313;
    --red300-color: #CE0808;
    --red200-color: #9D0606;
    --red100-color: #6C0404;
    
    --purple800-color: #EBDDF3;
    --purple700-color: #D5B6E7;
    --purple600-color: #BE90DA;
    --purple500-color: #A869CD;
    --purple400-color: #9244C0;
    --purple300-color: #76349D;
    --purple200-color: #592877;
    --purple100-color: #3C1B50;
    
    /* Navigation bar height */
    --nav-height: 60px;

    /* empty space */
    --side-space: 200px;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
  @font-face {
    font-family: 'EliceDigitalBaeum';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_elice@1.0/EliceDigitalBaeum.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
  
  
  html, body {
    color: var(--default-font-color);
    width: 100%;
    height: 100%;
    font-family: "EliceDigitalBaeum", -apple-system, Helvetica Neue, sans-serif;
    margin: 0;
    background: var(--white800-color);
  }

  button {
    border: none;
    cursor: pointer;
    padding: 0;
  }
  input {
    border: none;
    background-color: inherit;
  }
  input:focus {
    outline: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  a,
  div,
  span,
  input,
  button,
  textarea {
    font-family: inherit;
  }
`;

export { iconStyle, GlobalStyle };
