const canvas = document.querySelector(".snake");
const popup = document.querySelector(".popup");
const popupText = document.querySelector(".popup__text");
const popupScore = document.querySelector(".popup__score");
const restartBtn = document.querySelector(".popup__restart-button");

const context = canvas.getContext("2d");

const field = new Image();
field.src = "img/field.png";

const foodImg = new Image();
foodImg.src = `img/food${Math.floor(Math.random() * 6)}.png`;

const snakeHead = new Image();
snakeHead.src = "img/head.png";

const snakeBody = new Image();
snakeBody.src = "img/body.png";

let cell = 50;

let score = 0;

let food = {
  x: Math.floor(Math.random() * 12 + 1) * cell,
  y: Math.floor(Math.random() * 10 + 1) * cell,
};

let snake = [];
snake[0] = {
  x: 6 * cell,
  y: 5 * cell,
};

let dir;

const derection = function (e) {
  if (e.keyCode === 37 && dir !== "right") dir = "left";
  else if (e.keyCode === 38 && dir !== "down") dir = "up";
  else if (e.keyCode === 39 && dir !== "left") dir = "right";
  else if (e.keyCode === 40 && dir !== "up") dir = "down";
};
document.addEventListener("keydown", derection);

const gameOver = function () {
  popupText.textContent = "Game Over!";
  popupScore.textContent = `Your score: ${score}`;
  popup.style.display = " flex";
  clearInterval(game);
};

const gameRestart = function () {
  popup.style.display = "none";
  score = 0;
  snake = [];
  snake[0] = {
    x: 6 * cell,
    y: 5 * cell,
  };
  dir = "";
  game = setInterval(drawGame, 300);
};
restartBtn.addEventListener("click", gameRestart);

const eatTail = function (head, arr) {
  arr.forEach((el) => {
    if (head.x === el.x && head.y === el.y) {
      gameOver();
    }
  });
};

const drawGame = function () {
  context.drawImage(field, 0, 0);
  context.drawImage(foodImg, food.x, food.y);

  for (let [index, coords] of snake.entries()) {
    let bodyPart = index === 0 ? snakeHead : snakeBody;
    context.drawImage(bodyPart, coords.x, coords.y);
  }

  context.fillStyle = "white";
  context.font = "40px Arial";
  context.fillText(`SCORE: ${score}`, cell * 1.2, cell * 0.8);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 12 + 1) * cell,
      y: Math.floor(Math.random() * 10 + 1) * cell,
    };
    foodImg.src = `img/food${Math.floor(Math.random() * 6)}.png`;
  } else {
    snake.pop();
  }

  if (
    snakeX < cell ||
    snakeX > cell * 12 ||
    snakeY < 1 * cell ||
    snakeY > cell * 10
  ) {
    gameOver();
  }

  if (dir === "left") snakeX -= cell;
  if (dir === "right") snakeX += cell;
  if (dir === "up") snakeY -= cell;
  if (dir === "down") snakeY += cell;

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
};

let game = setInterval(drawGame, 300);
