const grid = document.querySelector(".grid");
const startButton = document.getElementById("start");
const scoreDisplay = document.getElementById("score");
const message = document.getElementById("message");
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
const speed = 0.9;
let timerId = 0;
const highScoreDisplay = document.getElementById("high-score");
let highScore = 0;
const upBtn = document.getElementById("up");
const downBtn = document.getElementById("down");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");

function createGrid() {
  //create 100 of these elements with a for loop
  for (let i = 0; i < width * width; i++) {
    //create element
    const square = document.createElement("div");
    //add styling to the element
    square.classList.add("square");
    //put the element into our grid
    grid.appendChild(square);
    //push it into a new squares array
    squares.push(square);
  }
}
createGrid();

currentSnake.forEach((index) => squares[index].classList.add("snake"));

function startGame() {
  message.textContent = "";
  //remove the snake
  currentSnake.forEach((index) => squares[index].classList.remove("snake"));
  //remove the apple
  squares[appleIndex].classList.remove("apple");
  clearInterval(timerId);
  currentSnake = [2, 1, 0];
  score = 0;
  //re add new score to browser
  scoreDisplay.textContent = score;
  direction = 1;
  intervalTime = 1000;
  generateApple();
  //readd the class of snake to our new currentSnake
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
  timerId = setInterval(move, intervalTime);
}

function move() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) || //if snake has hit bottom
    (currentSnake[0] % width === width - 1 && direction === 1) || //if snake has hit right wall
    (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
    (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
    squares[currentSnake[0] + direction].classList.contains("snake")
  )
    return clearInterval(timerId), (message.textContent = "GAME OVER");
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreDisplay.textContent = localStorage.getItem("highScore");
  }
  //remove last element from our currentSnake array
  const tail = currentSnake.pop();
  //remove styling from last element
  squares[tail].classList.remove("snake");
  //add square in direction we are heading
  currentSnake.unshift(currentSnake[0] + direction);
  //add styling so we can see it

  //deal with snake head gets apple
  if (squares[currentSnake[0]].classList.contains("apple")) {
    //remove the class of apple
    squares[currentSnake[0]].classList.remove("apple");
    //grow our snake by adding class of snake to it
    squares[tail].classList.add("snake");
    //grow our snake array
    currentSnake.push(tail);
    //generate new apple
    generateApple();
    //add one to the score
    score++;
    //display our score
    scoreDisplay.textContent = score;
    //speed up our snake
    clearInterval(timerId);
    intervalTime = intervalTime * speed;
    timerId = setInterval(move, intervalTime);
  }

  squares[currentSnake[0]].classList.add("snake");
}

function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}

function control(e) {
  if (e.key === "ArrowRight" || e.key === "d") {
    right();
  } else if (e.key === "ArrowUp" || e.key === "w") {
    up();
  } else if (e.key === "ArrowLeft" || e.key === "a") {
    left();
  } else if (e.key === "ArrowDown" || e.key === "s") {
    down();
  }
}

function right() {
  direction = 1;
}

function left() {
  direction = -1;
}

function up() {
  direction = -width;
}

function down() {
  direction = +width;
}

document.addEventListener("keydown", control);
startButton.addEventListener("click", startGame);
upBtn.addEventListener("click", function () {
  up();
});
downBtn.addEventListener("click", function () {
  down();
});
leftBtn.addEventListener("click", function () {
  left();
});
rightBtn.addEventListener("click", function () {
  right();
});
