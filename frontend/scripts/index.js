var chess = new Chess();
const matchHeight = () => {
    const evalBar = document.getElementById('eval-bar');
    const board = document.querySelector('.board-b72b1');
    if (evalBar && board) {
        evalBar.style.height = board.offsetHeight + 'px';
    }
}
matchHeight();
window.addEventListener('resize', matchHeight);

var board = Chessboard('chess-board', {
  draggable: false,
  position: 'start'
});

const gameInputForm = document.getElementById('game-input-form');
const gameInputField = document.getElementById('game-input');
const gameInputType = document.getElementById('game-input-type');
gameInputForm.addEventListener('submit', (e) => handleFormSubmit(e));


const handleFormSubmit = (e) => {
    e.preventDefault();
    const input = gameInputField.value;
    const type = gameInputType.value;
    if (type === 'pgn') {
        validatePGN(input);
    }
}