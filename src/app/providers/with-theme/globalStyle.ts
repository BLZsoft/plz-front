import { createGlobalStyle, css } from 'styled-components';

export const OverFlowScrollbar = css`
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-track {
    background-color: lightgray;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: gray;
  }
`;
export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Inter, sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0;
    text-align: left;
    // FIXME to pallet
    color: black;
    background-color: rgb(246, 246, 246);
    -webkit-font-smoothing: antialiased;
    display: block;
    -moz-osx-font-smoothing: grayscale;

    #root {
      display: flex;
      ${OverFlowScrollbar};  
      flex-direction: column;
      flex-wrap: nowrap;
      height: 100%;
    }
  }
  
  h1 {
    font-size: 24px;
  }
  
  h2 {
    font-size: 18px;
  }
  
  a{
    color: #5282FF;
    
    :hover{ 
      color: #789EFF;
    }
    :active{
      color: #336CFF;
    }
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active{
    -webkit-background-clip: text;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
  
  small, p {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }
`;

export const OverFlowWithoutScrollbar = css`
  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar for Chrome, Safari and Opera */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

export const NoSelect = css`
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
`;
