import React from "react";
import "./ReviewPanel.css";
import review_game from "./../../scripts/index";

const ReviewPanel = ({ setPGN }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = document.getElementById("game-input").value;
    const input_type = document.getElementById("game-input-type").value;
    const reviewed_game = await review_game(input, input_type);
    setPGN(reviewed_game);
  };
  return (
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
              placeholder="Enter PGN"
              required
            ></textarea>
            <select id="game-input-type">
              <option value="pgn">PGN</option>
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
  );
};

export default ReviewPanel;
