let cells = document.querySelectorAll(".entire-box-section > div");
let btnReset = document.querySelector(".btn-reset");
let resultDeclaration = document.querySelector(
  ".result-declaration-section > h1"
);
let markedCells = new Set();

//initialze starting conditions
let turnOfPlayerX = true;
let positionsOccupiedByX = new Set();
let positionsOccupiedByO = new Set();

//function to mark cells
const markCells = (cell) => {
  // Check if already marked
  if (markedCells.has(cell.id) || resultDeclaration.textContent !== "") {
    return;
  }
  //mark cells
  markedCells.add(cell.id);

  // check game status
  if (turnOfPlayerX) {
    cell.textContent = "X";
    positionsOccupiedByX.add(cell.id);
    turnOfPlayerX = false;
    gameStatus("X");
  } else {
    cell.textContent = "O";
    positionsOccupiedByO.add(cell.id);
    turnOfPlayerX = true;
    gameStatus("O");
  }
};

// function to check game status
const gameStatus = (player) => {
  let won = false;
  let backgroundToGreen = [];

  // selecting the set on which winning conditions to be checked
  let gameCheckingSet =
    player === "X" ? positionsOccupiedByX : positionsOccupiedByO;

  switch (true) {
    // Row directions
    case gameCheckingSet.has("cell-1") &&
      gameCheckingSet.has("cell-2") &&
      gameCheckingSet.has("cell-3"):
      backgroundToGreen = ["cell-1", "cell-2", "cell-3"];
      won = true;
      break;

    case gameCheckingSet.has("cell-4") &&
      gameCheckingSet.has("cell-5") &&
      gameCheckingSet.has("cell-6"):
      backgroundToGreen = ["cell-4", "cell-5", "cell-6"];
      won = true;
      break;

    case gameCheckingSet.has("cell-7") &&
      gameCheckingSet.has("cell-8") &&
      gameCheckingSet.has("cell-9"):
      backgroundToGreen = ["cell-7", "cell-8", "cell-9"];
      won = true;
      break;

    // Column directions
    case gameCheckingSet.has("cell-1") &&
      gameCheckingSet.has("cell-4") &&
      gameCheckingSet.has("cell-7"):
      backgroundToGreen = ["cell-1", "cell-4", "cell-7"];
      won = true;
      break;

    case gameCheckingSet.has("cell-2") &&
      gameCheckingSet.has("cell-5") &&
      gameCheckingSet.has("cell-8"):
      backgroundToGreen = ["cell-2", "cell-5", "cell-8"];
      won = true;
      break;

    case gameCheckingSet.has("cell-3") &&
      gameCheckingSet.has("cell-6") &&
      gameCheckingSet.has("cell-9"):
      backgroundToGreen = ["cell-3", "cell-6", "cell-9"];
      won = true;
      break;

    // Diagonal directions
    case gameCheckingSet.has("cell-1") &&
      gameCheckingSet.has("cell-5") &&
      gameCheckingSet.has("cell-9"):
      backgroundToGreen = ["cell-1", "cell-5", "cell-9"];
      won = true;
      break;

    case gameCheckingSet.has("cell-3") &&
      gameCheckingSet.has("cell-5") &&
      gameCheckingSet.has("cell-7"):
      backgroundToGreen = ["cell-3", "cell-5", "cell-7"];
      won = true;
      break;

    default:
      won = false;
      break;
  }

  if (won) {
    resultDeclaration.textContent = `${player} wins!`;
    backgroundToGreen.forEach((item) => {
      document.getElementById(item).style.backgroundColor = "rgb(94, 242, 94)";
    });
  } else if (markedCells.size === 9) {
    resultDeclaration.textContent = "It's a draw!";
  }
};

//Reset function
const resetFunction = () => {
  markedCells.clear();
  positionsOccupiedByX.clear();
  positionsOccupiedByO.clear();
  resultDeclaration.textContent = "";
  turnOfPlayerX = true;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "transparent";
  });
};

cells.forEach((cell) => {
  cell.addEventListener("click", () => markCells(cell));
});

// Attach the event listener to the reset button
btnReset.addEventListener("click", resetFunction);
