import router from "./Router";
import { RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import ReactGA from 'react-ga'
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { store } from "./_store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist"

import { GlobalStyle } from "./components/globalStyle.js";

// import X_FullPage from "./routes/X_FullPage/X_FullPage"

if (process.env.REACT_APP_GOOGLE_ANALYTICS_TRANKING_ID) {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRANKING_ID);
}
const persistor = persistStore(store);
const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
