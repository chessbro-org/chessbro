import React from "react";
import "./ReviewPanel.css";
const ReviewPanel = () => {
  return (
    <div id="review-panel">
      <div id="review-panel-header">
        <h2>Game Review</h2>
      </div>
      <hr />
      <div id="game-input-container">
        <form id="game-input-form">
          <div id="game-input-box">
            <input
              type="text"
              id="game-input"
              placeholder="Enter PGN here"
            ></input>
            <select id="game-input-type">
              <option value="pgn">PGN</option>
            </select>
          </div>
          <div id="game-input-button-container">
            <button type="submit" id="game-input-button">
              Analyse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewPanel;
