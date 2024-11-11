import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import GameReview from "./components/GameReview/GameReview";

import "./App.css";
import Loading from "./components/Common/Loading";
const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  if (isLoading) {
    document.body.classList.add("loading");
  } else {
    document.body.classList.remove("loading");
  }
  return (
    <>
      <div className="app">
        <Navbar />
        {isLoading && <Loading isLoading={isLoading} />}
        <GameReview setIsLoading={setIsLoading} />
      </div>
    </>
  );
};

export default App;
