import React, { useEffect, useRef } from "react";
import Chessboard from "chessboardjs";
import "./ChessboardComponent.css";
const ChessboardComponent = () => {
  const boardRef = useRef(null);

  useEffect(() => {
    const board = Chessboard(boardRef.current, {
      position: "start",
      draggable: false,
      innerWidth: "12vw",
      pieceTheme:
        "https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png",
    });

    return () => board.destroy();
  }, []);
  window.addEventListener("resize", () => {
    document.getElementById("chessboard");
  });
  return <div id="chessboard" ref={boardRef} />;
};
export default ChessboardComponent;
