import errorMessageSound from "../assets/sound/error-message.mp3";

const showErrorMessage = (message) => {
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

export default showErrorMessage