const grid = document.querySelector(".grid");
const startBtn = document.getElementById("start");
const score = document.getElementById("score");
let squares = [];
let currentSnake = [0, 1, 2];

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
