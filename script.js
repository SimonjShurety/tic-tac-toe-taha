"use strict";

const boardEl = document.querySelector(".board");
const activeLabel = document.querySelector(".active-label");
let activePlayer; // is either capital "X" or capital "O"
let moveNumber = 0;
let won = false;

//////////////////// FUNCTIONS ////////////////////

const updateLabel = function () {
  if (activePlayer === "X") {
    activeLabel.textContent = "Player 1 (X), you're up!";
  }

  if (activePlayer === "O") {
    activeLabel.textContent = "Player 2 (O), you're up!";
  }
};

//////////////// ELEMENT INITALIZATION ////////////////////

for (let i = 1; i <= 9; i++) {
  boardEl.insertAdjacentHTML("beforeend", `<div class="tile tile-${i}"></div>`);
}

// Writes to the label
activePlayer = "X";
updateLabel();

////////////////// CLICKING INITALIZATION ////////////////

const tiles = document.querySelectorAll(".tile");

tiles.forEach(function (curTile) {
  curTile.addEventListener("click", function () {
    // If the current tile thats being clicked is NOT already checked
    if (!this.classList.contains("checked")) {
      this.textContent = activePlayer;
      this.classList.add("checked");
      moveNumber += 1;

      // Switches the active player
      activePlayer === "X" ? (activePlayer = "O") : (activePlayer = "X");

      updateLabel();

      ////////////////// LOGIC CHECKING ////////////////

      const checkWin = function (tile1, tile2, tile3) {
        if (
          tile1.textContent === "X" &&
          tile2.textContent === "X" &&
          tile3.textContent === "X"
        ) {
          won = true;
          boardEl.classList.add("hidden");
          activeLabel.textContent = "Player 1 (X) wins! 🎉";
          setTimeout(() => location.reload(), 10000);
        }

        if (
          tile1.textContent === "O" &&
          tile2.textContent === "O" &&
          tile3.textContent === "O"
        ) {
          won = true;
          boardEl.classList.add("hidden");
          activeLabel.textContent = "Player 2 (O) wins! 🎉";
          setTimeout(() => location.reload(), 10000);
        }
      };

      const tile1 = document.querySelector(".tile-1");
      const tile2 = document.querySelector(".tile-2");
      const tile3 = document.querySelector(".tile-3");
      const tile4 = document.querySelector(".tile-4");
      const tile5 = document.querySelector(".tile-5");
      const tile6 = document.querySelector(".tile-6");
      const tile7 = document.querySelector(".tile-7");
      const tile8 = document.querySelector(".tile-8");
      const tile9 = document.querySelector(".tile-9");

      // Verticle marking
      checkWin(tile1, tile4, tile7);
      checkWin(tile2, tile5, tile8);
      checkWin(tile3, tile6, tile9);

      // Horizontal marking
      checkWin(tile1, tile2, tile3);
      checkWin(tile4, tile5, tile6);
      checkWin(tile7, tile8, tile9);

      // Diagnol marking
      checkWin(tile1, tile5, tile9);
      checkWin(tile3, tile5, tile7);

      if (moveNumber === 9 && !won) {
        boardEl.classList.add("hidden");
        activeLabel.textContent = "It's a draw! 0️⃣";
        setTimeout(() => location.reload(), 10000);
      }
    }
  });
});
