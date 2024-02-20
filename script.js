const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const modalElement = document.querySelector(".modal-container");
const buttonReload = document.querySelector(".reload");

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

//Score
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.textContent = `High Score: ${highScore}`;

//Game Over
let gameOver = false;

const handleGameOver = () => {
  clearInterval(setIntervalID);
  modalElement.style.visibility = "initial";
};

const reloadPage = () => {
  location.reload();
};

buttonReload.onclick = reloadPage;

// Elegir numero aleatorio
const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const changeDirection = (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
      }
      break;
    case "ArrowDown":
      if (velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
      }
      break;
    case "ArrowLeft":
      if (velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
      }
      break;
    case "ArrowRight":
      if (velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
      }
      break;
  }
};

document.addEventListener("keydown", changeDirection);

const initGame = () => {
  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.unshift([snakeX, snakeY]);
    score++;
    highScore = Math.max(score, highScore);
    localStorage.setItem("high-score", highScore);
    highScoreElement.textContent = `High Score: ${highScore}`;
    scoreElement.textContent = `Score: ${score}`;
  }

  snakeX += velocityX;
  snakeY += velocityY;

  if (
    snakeX < 0 ||
    snakeX > 30 ||
    snakeY < 0 ||
    snakeY > 30 ||
    snakeBody.some(([x, y]) => snakeX === x && snakeY === y)
  ) {
    gameOver = true;
  }

  if (gameOver) return handleGameOver();

  snakeBody.unshift([snakeX, snakeY]);
  const snakeHtml = snakeBody
    .map(
      ([x, y]) => `<div class="s-head" style="grid-area: ${y} / ${x}"></div>`
    )
    .join("");
  playBoard.innerHTML = htmlMarkup + snakeHtml;
  snakeBody.pop();
};

// Variable para controlar la velocidad del snake
let speed = 250; // Velocidad inicial

// Variable para controlar si se está presionando la tecla Space
let spacePressed = false;

// Función para cambiar la velocidad del snake
const changeSpeed = (newSpeed) => {
  speed = newSpeed; // Cambiar la velocidad
  clearInterval(newIntervalID); // Limpiar el intervalo actual
  newIntervalID = setInterval(initGame, speed); // Configurar un nuevo intervalo con la nueva velocidad
};

// Event listener para detectar la presión y liberación de la tecla Space
document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    spacePressed = true;
    changeSpeed(50); // Cambiar la velocidad a 50
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === " ") {
    spacePressed = false;
    changeSpeed(250); // Cambiar la velocidad de vuelta a 250
  }
});

// Actualización de la función setInterval para usar la velocidad actual
let newIntervalID = setInterval(initGame, speed);

changeFoodPosition();
initGame();
