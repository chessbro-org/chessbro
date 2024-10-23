import React, { useEffect, useRef } from "react";
import Chessboard from "chessboardjs";
import "./ChessboardComponent.css";
const ChessboardComponent = () => {
  const boardRef = useRef(null);

  useEffect(() => {
    const board = Chessboard(boardRef.current, {
      position: "start",
      draggable: false,
      pieceTheme:
        "https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png",
    });

    return () => board.destroy();
  }, []);

  return <div id="chessboard" ref={boardRef} />;
};

export default ChessboardComponent;
