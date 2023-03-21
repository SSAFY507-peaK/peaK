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
    --yellow600-color: #FFC56C;
    --red600-color: #FA7474;
    --red500-color: #F84444;
    --red400-color: #F61313;
    --red300-color: #CE0808;
    --purple800-color: #EBDDF3;
    --purple500-color: #A869CD;
    --purple400-color: #9244C0;
    --purple300-color: #76349D;
    
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
