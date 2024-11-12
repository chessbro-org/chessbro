import errorMessageSound from "../assets/sound/error-message.mp3";
const validatePGN = async (pgn) => {
  try {
    const response = await fetch(
      "https://obnoxious-jyoti-daamin-c6a01a27.koyeb.app/api/validate-pgn",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pgn }),
      }
    );
    const valid = await response.json();
    return valid ? "yes" : "no";
  } catch {
    showErrorMessage("Error 404 - Couldn't Connect to Server.");
  }
};

export const invalidPGN = () => {
  showErrorMessage("Invalid PGN");
};
export default validatePGN;

export const showErrorMessage = (message) => {
  const messageBox = document.createElement("div");
  messageBox.textContent = message;
  messageBox.style.position = "fixed";
  messageBox.style.bottom = "10vh";
  messageBox.style.left = "50%";
  messageBox.style.transform = "translateX(-50%)";
  messageBox.style.backgroundColor = "#f44336";
  messageBox.style.color = "white";
  messageBox.style.padding = "10px 20px";
  messageBox.style.borderRadius = "5px";
  messageBox.style.zIndex = "10000000";
  messageBox.style.fontSize = "18px";
  document.body.appendChild(messageBox);
  const errorMessage = new Audio(errorMessageSound);
  errorMessage.play();
  setTimeout(() => {
    messageBox.remove();
  }, 3000);
};
