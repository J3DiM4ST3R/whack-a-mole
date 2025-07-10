"use strict";

const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");
const timeLeftDisplay = document.getElementById("time-left");
const startBtn = document.getElementById("start-btn");

let score = 0;
let timeLeft = 30;
let timerId = null;
let moleTimerId = null;
let gameOver = false;

function createGrid() {
  grid.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const hole = document.createElement("div");
    hole.classList.add("hole");
    hole.dataset.index = i;
    grid.appendChild(hole);
  }
}

function startGame() {
  gameOver = false;
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timeLeftDisplay.textContent = timeLeft;
  createGrid();

  moveMole();
  timerId = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  timeLeftDisplay.textContent = timeLeft;
  if (timeLeft <= 0) {
    clearInterval(timerId);
    clearInterval(moleTimerId);
    gameOver = true;
    alert("⏰ Time's up! Final score: " + score);
  }
}

function moveMole() {
  moleTimerId = setInterval(() => {
    if (gameOver) return;

    // Clear existing moles
    document.querySelectorAll(".mole").forEach(m => m.remove());

    const holes = document.querySelectorAll(".hole");
    const randomIndex = Math.floor(Math.random() * holes.length);
    const mole = document.createElement("div");
    mole.classList.add("mole");

    mole.addEventListener("click", () => {
      if (!gameOver) {
        score++;
        scoreDisplay.textContent = score;
        mole.remove();
      }
    });

    holes[randomIndex].appendChild(mole);
  }, 800);
}

startBtn.addEventListener("click", startGame);

// Initialize grid on page load
createGrid();
