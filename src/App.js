import React from "react";
import "./App.scss";
import Routes from "./Config/Routes";
import { Header } from "./Components";




const App = (props) => {
  return (
    <>
    <Header />
    <div className="main">
      <Routes />
    </div>
    </>
  );
};

export default App;
