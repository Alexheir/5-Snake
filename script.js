const playBoard = document.querySelector(".play-board");
// Fruta
let foodX, foodY;
//Snake
let snakeX = 10,
  snakeY = 20;

let snakeBody = [];
let velocityX = 0,
  velocityY = 0;

// Interval
let setIntervalID;

//F Game Over
let gameOver = false;
const handleGameOver = () => {
  clearInterval(setIntervalID);
  alert("Game Over!");
  location.reload();
};

// Elegir numero aleatorio
const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const changeDirection = (e) => {
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};

const initGame = () => {
  let htmlMarkup = `<div class = "food" style = "grid-area: ${foodY} / ${foodX}"></div>`; // acento grave Alt + 96
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]);
  }

  for (i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY];

  snakeX += velocityX;
  snakeY += velocityY;

  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkup += `<div class = "s-head" style = "grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
  }

  //Game Over
  if (snakeX < 0 || snakeX > 30 || snakeY < 0 || snakeY > 30) {
    gameOver = true;
    console.log("Game Over");
  }
  if (gameOver) return handleGameOver();

  playBoard.innerHTML = htmlMarkup;
};

//Evento de escucha del teclado
document.addEventListener("keydown", changeDirection);

//Llamado de funciones

setIntervalID = setInterval(initGame, 200);
changeFoodPosition();
initGame();