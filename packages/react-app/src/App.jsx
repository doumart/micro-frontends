import React, { useEffect } from "react";
import logo from "./assets/logo.png";
import "./index.css";

const App = () => {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("loaded", { detail: "reactApp" }))
  }, [])

  return (
    <div className="row">
      <img className="logo" src={logo} />
      <span className="framework-name">React App</span>
    </div>
  );
}

export default App;
