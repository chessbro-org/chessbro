import React from "react";
import ChessboardComponent from "./components/ChessboardComponent/ChessboardComponent";
import Navbar from "./components/Navbar/Navbar";
import ReviewPanel from "./components/ReviewPanel/ReviewPanel";
import GameReview from "./components/GameReview/GameReview";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <GameReview />
    </div>
  );
};

export default App;
