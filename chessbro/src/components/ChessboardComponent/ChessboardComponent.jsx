import React, { useEffect, useRef } from "react";
import Chessboard from "chessboardjs";
import "./ChessboardComponent.css";
const ChessboardComponent = ({ currentFEN }) => {
  const boardRef = useRef(null);
  useEffect(() => {
    const board = Chessboard(boardRef.current, {
      position: currentFEN,
      draggable: false,
      pieceTheme:
        "https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png",
    });

    return () => board.destroy();
  }, [currentFEN]);
  return <div id="chessboard" ref={boardRef} />;
};
export default ChessboardComponent;
