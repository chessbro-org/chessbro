import React, { useEffect, useRef } from "react";
import Chessboard from "chessboardjs";
import "./ChessboardComponent.css";

const ChessboardComponent = ({ PGN, currentMove, flipped }) => {
  const boardRef = useRef(null);
  const chessboardInstance = useRef(null);
  useEffect(() => {
    chessboardInstance.current = Chessboard(boardRef.current, {
      position: PGN.move_evaluations[currentMove].fen,
      draggable: false,
      pieceTheme: "/piece_images/{piece}.png",
    });
    if (flipped) {
      chessboardInstance.current.orientation("black");
    } else {
      chessboardInstance.current.orientation("white");
    }
  }, [PGN, currentMove, flipped]);

  useEffect(() => {
    const handleResize = () => {
      if (chessboardInstance.current) {
        chessboardInstance.current.resize();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return <div id="chessboard" ref={boardRef} />;
};

export default ChessboardComponent;
