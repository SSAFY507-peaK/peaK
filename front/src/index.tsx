import { GlobalStyle } from "./components/globalStyle.js";
import { Provider } from "react-redux";
import ReactGA from 'react-ga'
import { RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import router from "./Router";
import { store } from "./_store/store";

// import FullPage from "./routes/FullPage/FullPage"

if (process.env.REACT_APP_GOOGLE_ANALYTICS_TRANKING_ID) {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRANKING_ID);
}

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <GlobalStyle />
    <RouterProvider router={router} />
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
