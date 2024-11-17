import React, { useEffect, useState } from "react";
import "./ReviewPanel.css";
import review_game from "./../../scripts/index";
import GameList from "../GameList/GameList";
const ReviewPanel = ({ setPGN, setIsLoading }) => {
  const [currentType, setCurrentType] = useState("pgn");
  const [username, setUsername] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const date_obj = new Date();
  const [date, setDate] = useState([
    date_obj.getFullYear(),
    String(date_obj.getMonth() + 1).padStart(2, "0"),
  ]);
  const [games, setGames] = useState(false);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
    } catch {}
    const input = document.getElementById("game-input");
    const input_type = document.getElementById("game-input-type");
    if (input.value.length === 0) {
      return;
    }
    setDate([
      date_obj.getFullYear(),
      String(date_obj.getMonth() + 1).padStart(2, "0"),
    ]);
    setIsLoading(true);
    await review_game(
      input.value,
      input_type.value,
      setPGN,
      date[1],
      date[0],
      setGames,
      setIsOpen,
      setUsername
    );
    setIsLoading(false);
    input.value = "";
    input_type.value = "pgn";
  };
  return (
    <>
      <div id="review-panel">
        <div id="review-panel-header">
          <h2>Game Review</h2>
        </div>
        <hr />
        <div id="game-input-container">
          <form id="game-input-form" onSubmit={handleSubmit}>
            <div id="game-input-box">
              <textarea
                type="text"
                id="game-input"
                placeholder={
                  currentType === "pgn" ? "Enter PGN" : "Enter Username"
                }
                required
              ></textarea>
              <select
                onChange={(e) => setCurrentType(e.target.value)}
                id="game-input-type"
              >
                <option value="pgn">PGN</option>
                <option value="chess.com">chess.com</option>
              </select>
            </div>
            <div id="game-input-button-container">
              <button type="submit" id="game-input-button">
                <p id="img">🔍</p>| Analyse
              </button>
            </div>
          </form>
        </div>
      </div>
      {isOpen && (
        <GameList
          games={games}
          setDate={setDate}
          setPGN={setPGN}
          date={date}
          setGames={setGames}
          setIsLoading={setIsLoading}
          username={username}
          setIsOpen={setIsOpen}
          setUsername={setUsername}
        />
      )}
    </>
  );
};

export default ReviewPanel;
