import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import UserProvider from "./context/userProvider";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <UserProvider>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </UserProvider>
  </Provider>,
  document.getElementById("root")
);
