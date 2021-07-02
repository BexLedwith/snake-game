const grid = document.querySelector(".grid");
const startBtn = document.getElementById("start");
const score = document.getElementById("score");
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;

// create elements, create 100 elemens, add styling, create array of squares
function createGrid() {
  for (let i = 100; i > 0; i--) {
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
  const tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);
  squares[currentSnake[0]].classList.add("snake");
}

move();

let timerID = setInterval(move, 1000);

//key codes:
// 39 right arrow, 38 up arrow, 37 left arrow, 40 down arrow

function control(e) {
  e.keyCode === 39
    ? console.log("right pressed")
    : e.keyCode === 38
    ? console.log("up pressed")
    : e.keyCode === 37
    ? console.log("left pressed")
    : e.keyCode === 40
    ? console.log("down arrow")
    : console.log("key press not recognized");
}

// update keyCode is deprecated, switch to e.key
