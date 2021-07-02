const grid = document.querySelector(".grid");
const startBtn = document.getElementById("start");
const score = document.getElementById("score");
let squares = [];
let currentSnake = [2, 1, 0];

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
}

move();
