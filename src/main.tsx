import "./index.css";
import "./mocks/browser.ts";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { enableMockServiceWorker } from "./mocks/browser.ts";

import { store } from "./store/store.ts";
import { Provider } from "react-redux";

enableMockServiceWorker().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
});
