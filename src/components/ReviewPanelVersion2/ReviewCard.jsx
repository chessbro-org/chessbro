import React from "react";
import "./ReviewCard.css";
import Accuracy from "./player/Accuracy";
import PlayerCard from "./player/PlayerCard";
import MoveQuality from "./MoveQuality";
const ReviewCard = ({
  move_numbers,
  PGN,
  setReviewStarted,
  setCurrentMove,
  profilePics,
}) => {
  const white = PGN.accuracy ? PGN.accuracy.white : 100;
  const black = PGN.accuracy ? PGN.accuracy.black : 100;
  const handleClick = (e) => {
    setReviewStarted(true);
    setCurrentMove(1);
  };
  return (
    <div className="report-card">
      <div className="stats">
        <PlayerCard info={PGN?.info} profilePics={profilePics} />
        <Accuracy white={white} black={black} />
      </div>
      <ul className="move_quality_list">
        <MoveQuality
          numberW={move_numbers.w.book_move}
          numberB={move_numbers.b.book_move}
          name="Book Move"
          image={"/quality_imgs/book_move.png"}
        />
        <MoveQuality
          numberW={move_numbers.b.best_move}
          numberB={move_numbers.b.best_move}
          name="Best"
          image={"/quality_imgs/best_move.png"}
        />
        <MoveQuality
          numberW={move_numbers.w.excellent}
          numberB={move_numbers.b.excellent}
          name="Excellent"
          image={"/quality_imgs/excellent.png"}
        />
        <MoveQuality
          numberB={move_numbers.b.good}
          numberW={move_numbers.w.good}
          name="Good"
          image={"/quality_imgs/good.png"}
        />
        <MoveQuality
          numberW={move_numbers.w.inaccuracy}
          numberB={move_numbers.b.inaccuracy}
          name="Inaccuracy"
          image={"/quality_imgs/inaccuracy.png"}
        />
        <MoveQuality
          name="Mistake"
          numberW={move_numbers.w.mistake}
          numberB={move_numbers.b.mistake}
          image={"/quality_imgs/mistake.png"}
        />
        <MoveQuality
          numberW={move_numbers.w.blunder}
          numberB={move_numbers.b.blunder}
          name="Blunder"
          image={"/quality_imgs/blunder.png"}
        />
      </ul>
      <button className="start-review-btn" onClick={handleClick}>
        Start Review
      </button>
    </div>
  );
};

export default ReviewCard;
