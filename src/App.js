import React from "react";
import "./App.css";
import Cursor from "./Cursor/Cursor";
import Scene from "./Scene/Scene";
import Header from "./Header/Header";
import FirstContent from "./Content/firstContent/FirstContent";

function App() {
  return (
    <>
      <Header />
      <Scene />
      <Cursor />
      <FirstContent />
    </>
  );
}

export default App;
