function openSettings() {
  alert("Open settings");
}

function showInstructions() {
  alert("Arrange the slide in the order..");
}

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-btn");
  const welcomeScreen = document.getElementById("welcome-screen");
  const gameScreen = document.getElementById("game-screen");
  const puzzleContainer = document.querySelector("#puzzle-container");

  let puzzle = [];
  let size = 3;

  startButton.addEventListener("click", startGame);

  function startGame() {
    console.log("Start Game button clicked!");

    welcomeScreen.style.display = "none";
    gameScreen.style.display = "block";

    generatePuzzle();
    randomizePuzzle();
    renderPuzzle();
    handleInput();
  }

  function openSettings() {
    alert("Open settings");
  }

  function showInstructions() {
    alert("Arrange the slide in the order..");
  }

  function getRow(pos) {
    return Math.floor((pos - 1) / size) + 1;
  }

  function getCol(pos) {
    return ((pos - 1) % size) + 1;
  }

  function generatePuzzle() {
    for (let i = 1; i <= size * size; i++) {
      puzzle.push({
        value: i,
        position: i,
        x: (getCol(i) - 1) * 100,
        y: (getRow(i) - 1) * 100,
        disabled: false,
      });
    }
  }

  function renderPuzzle() {
    puzzleContainer.innerHTML = "";
    for (let puzzleItem of puzzle) {
      if (puzzleItem.disabled) continue;

      puzzleContainer.innerHTML += `
          <div
            class="puzzle-item"
            style="left: ${puzzleItem.x}px; top: ${puzzleItem.y}px;">
            ${puzzleItem.value}
          </div>
        `;
    }
  }

  function randomizePuzzle() {
    const randomValues = getRandomValues();
    let i = 0;
    for (let puzzleItem of puzzle) {
      puzzleItem.value = randomValues[i];
      i++;
    }
    const puzzleWithValueOf9 = puzzle.find(
      (item) => item.value === size * size
    );
    puzzleWithValueOf9.disabled = true;
  }

  function getRandomValues() {
    const values = [];
    for (let i = 1; i <= size * size; i++) {
      values.push(i);
    }
    const randomValues = values.sort(() => Math.random() - 0.5);
    return randomValues;
  }

  function handleInput() {
    puzzleContainer.addEventListener("click", (e) => {
      const clickedValue = parseInt(e.target.textContent, 10);
      const clickedTile = puzzle.find((item) => item.value === clickedValue);
      const emptyTile = puzzle.find((item) => item.disabled);

      if (!clickedTile || !emptyTile) return;

      const canMove =
        (Math.abs(clickedTile.position - emptyTile.position) === 1 &&
          Math.floor((clickedTile.position - 1) / size) ===
            Math.floor((emptyTile.position - 1) / size)) ||
        Math.abs(clickedTile.position - emptyTile.position) === size;

      if (canMove) {
        [clickedTile.position, emptyTile.position] = [
          emptyTile.position,
          clickedTile.position,
        ];

        [clickedTile.x, emptyTile.x] = [emptyTile.x, clickedTile.x];
        [clickedTile.y, emptyTile.y] = [emptyTile.y, clickedTile.y];

        renderPuzzle();
      }
    });
  }
});
