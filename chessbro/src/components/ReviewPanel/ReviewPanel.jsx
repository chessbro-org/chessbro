import React from "react";
import "./ReviewPanel.css";
import rook from "../../assets/branding/logo.png";
const ReviewPanel = () => {
  return (
    <div id="review-panel">
      <div id="review-panel-header">
        <img id="rook" src={rook} />
        <h2>Analyse</h2>
      </div>
      <div id="game-input-container">
        <form id="game-input-form">
          <div id="game-input-box">
            <textarea
              type="text"
              id="game-input"
              placeholder="Enter PGN here"
            ></textarea>
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
