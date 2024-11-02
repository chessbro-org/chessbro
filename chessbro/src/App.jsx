import React from "react";
import Navbar from "./components/Navbar/Navbar";
import GameReview from "./components/GameReview/GameReview";

import "./App.css"
const App = () => {
  return (
    <div className="app">
      <Navbar />
      <GameReview />
    </div>
  );
};

export default App;
