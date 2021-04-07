import Layout from "components/Layout";
import Routes from "pages/Routes";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "store/index";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Layout>
        <Routes />
      </Layout>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
