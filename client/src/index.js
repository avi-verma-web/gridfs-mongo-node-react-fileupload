import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route } from "react-router-dom";
import AllFiles from "./components/AllFiles";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/" component={App}></Route>
      <Route exact path="/documents" component={AllFiles}></Route>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
