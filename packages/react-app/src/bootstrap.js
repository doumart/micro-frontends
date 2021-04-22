import "regenerator-runtime/runtime.js";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

export const mount = (element) => {
  ReactDOM.render(<App />, element);
}
