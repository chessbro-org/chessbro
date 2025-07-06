import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
  faL,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import "./GameList.css";
import GameBox from "./GameBox";
import getGames from "../../scripts/getgames";
const GameList = ({
  games,
  setDate,
  setPGN,
  date,
  setGames,
  setIsLoading,
  username,
  setIsOpen,
  setUsername,
  setIsUnderReview,
  setProfilePics,
}) => {
  useEffect(() => {
    setIsLoading(true);
    getGames(username, date[1], date[0]).then((newGames) => {
      setIsLoading(false);
      setGames(newGames);
    });
  }, [date]);
  useEffect(() => {
    if (!games) {
      handleClick(0, setDate, date);
    }
  }, [games]);
  const handleClick = (f_or_b, setDate, date) => {
    switch (f_or_b) {
      case 1:
        if (parseInt(date[1]) == 12) {
          setDate([parseInt(date[0]) + 1, "01"]);
        } else {
          var temp = parseInt(date[1]) + 1;
          if (temp < 10) {
            temp = `0${temp}`;
          }
          setDate([date[0], temp]);
        }
        break;
      case 0:
        if (parseInt(date[1]) == 1) {
          setDate([parseInt(date[0]) - 1, "12"]);
        } else {
          var temp = parseInt(date[1]) - 1;
          if (temp < 10) {
            temp = `0${temp}`;
          }
          setDate([date[0], temp]);
        }
        break;
    }
  };
  return (
    <div className="game-list">
      <div className="info-panel">
        {`Games for ${username} for ${date[1]}/${date[0]}`}
        <button
          id="close-btn"
          className="controls-game-list"
          onClick={() => {
            setIsOpen(false);
            setUsername("");
            setGames(false);
          }}
        >
          <FontAwesomeIcon icon={faWindowClose} />
        </button>
      </div>

      <div className="game-content">
        {games ? (
          games.map((game, index) => {
            return (
              <GameBox
                key={index}
                game={game}
                setPGN={setPGN}
                setDate={setDate}
                setIsLoading={setIsLoading}
                setIsOpen={setIsOpen}
                setUsername={setUsername}
                setIsUnderReview={setIsUnderReview}
                setProfilePics={setProfilePics}
              />
            );
          })
        ) : (
          <div className="game-box">No Games Found</div>
        )}
      </div>
      <div className="button-panel">
        <button
          className="controls-game-list"
          onClick={() => handleClick(0, setDate, date)}
        >
          <FontAwesomeIcon icon={faArrowCircleLeft} />
        </button>
        <button className="controls-game-list">
          <FontAwesomeIcon
            icon={faArrowCircleRight}
            onClick={() => handleClick(1, setDate, date)}
          />
        </button>
      </div>
    </div>
  );
};

export default GameList;
