const grid = document.querySelector(".grid");
const startBtn = document.getElementById("start");
const score = document.getElementById("score");
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;

// create elements, create 100 elemens, add styling, create array of squares
function createGrid() {
  for (let i = width * width; i > 0; i--) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square); // must use qs to append child
    squares.push(square);
  }
}

createGrid();

currentSnake.forEach((index) => squares[index].classList.add("snake"));

// remove last element from current snake array
// remove styling from last element
// add square in direction we are heading
// add styling so we can see it
function move() {
  // check if snake hits any walls
  if (
    (currentSnake[0] + width >= width * width && direction === width) || //if snake has hit bottom
    (currentSnake[0] % width === width - 1 && direction === 1) || //if snake has hit right wall
    (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
    (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
    squares[currentSnake[0] + direction].classList.contains("snake")
  )
    return clearInterval(timerId);
  const tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);

  // deal with snake head getting the apple, remove class of apple, grow snake by 1, grow snake array, generate a new apple, add one to the score, speed up our snake
  // snakeHead ===
  squares[currentSnake[0]].classList.add("snake");
}

move();

let timerID = setInterval(move, 1000);

function generateApples() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}

generateApples();

//key codes:
// 39 right arrow, 38 up arrow, 37 left arrow, 40 down arrow

function control(e) {
  e.keyCode === 39
    ? (direction = 1)
    : e.keyCode === 38
    ? (direction = -width)
    : e.keyCode === 37
    ? (direction = -1)
    : e.keyCode === 40
    ? (direction = +width)
    : console.log("key press not recognized");
}

// update keyCode is deprecated, switch to e.key

document.addEventListener("keydown", control);
