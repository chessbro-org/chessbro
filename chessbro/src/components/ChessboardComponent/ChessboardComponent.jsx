import React, { useEffect, useRef } from "react";
import Chessboard from "chessboardjs";
import "./ChessboardComponent.css";
const ChessboardComponent = ({ PGN, currentMove }) => {
  const boardRef = useRef(null);
  useEffect(() => {
    const board = Chessboard(boardRef.current, {
      position: PGN.move_evaluations[currentMove].fen,
      draggable: false,
      pieceTheme:
        "https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png",
    });

    return () => board.destroy();
  }, [PGN, currentMove]);
  return <div id="chessboard" ref={boardRef} />;
};
export default ChessboardComponent;
