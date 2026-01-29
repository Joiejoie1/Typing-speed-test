// =====================
// Typing Speed Test App
// =====================

// Debug check
console.log("App JS connected");

// ---------------------
// App Config & State
// ---------------------
let mode = "timed"; // "timed" | "passage"
let difficulty = "easy";

let passages = {};
let currentPassage = "";
let typedText = "";

let totalTyped = 0;
let totalErrors = 0;

let timeLeft = 60;
let timer = null;
let isRunning = false;
let personalBest = Number(localStorage.getItem("personalBest")) || 0;
document.getElementById("personal-best").textContent = personalBest;


// ---------------------
// DOM Elements
// ---------------------
const passageEl = document.getElementById("passage");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const timeEl = document.getElementById("time");
const resultsEl = document.getElementById("results");
const hintEl = document.getElementById("hint");
const restartBtn = document.getElementById("restart");

// ---------------------
// Load Passage Data
// ---------------------
fetch("./data.json")
  .then(res => res.json())
  .then(data => {
    passages = data;
    loadPassage();
  });

// ---------------------
// Passage Logic
// ---------------------
function loadPassage() {
  const list = passages[difficulty];
  currentPassage = list[Math.floor(Math.random() * list.length)].text;

  typedText = "";
  passageEl.innerHTML = "";

  currentPassage.split("").forEach(char => {
    const span = document.createElement("span");
    span.textContent = char;
    passageEl.appendChild(span);
  });
}

// ---------------------
// Character Comparison
// ---------------------
function updateCharacters() {
  const spans = passageEl.querySelectorAll("span");

  spans.forEach((span, index) => {
    const typedChar = typedText[index];
    const expectedChar = currentPassage[index];

    span.classList.remove("correct", "incorrect", "cursor");

    if (typedChar == null) {
      if (index === typedText.length) {
        span.classList.add("cursor");
      }
      return;
    }

    if (typedChar === expectedChar) {
      span.classList.add("correct");
    } else {
      span.classList.add("incorrect");
      totalErrors++;
    }
  });

  updateStats();

  if (mode === "passage" && typedText.length === currentPassage.length) {
    endTest();
  }
}

// ---------------------
// Stats Calculation
// ---------------------
function calculateWPM() {
  const minutes = (mode === "timed" ? 60 - timeLeft : timeLeft) / 60;
  return minutes > 0 ? Math.round((totalTyped / 5) / minutes) : 0;
}

function calculateAccuracy() {
  if (totalTyped === 0) return 100;
  return Math.round(((totalTyped - totalErrors) / totalTyped) * 100);
}

function updateStats() {
  wpmEl.textContent = calculateWPM();
  accuracyEl.textContent = `${calculateAccuracy()}%`;
}

// ---------------------
// Timer Logic
// ---------------------
function startTimer() {
  if (isRunning) return;

  isRunning = true;

  timer = setInterval(() => {
    if (mode === "timed") {
      timeLeft--;
      timeEl.textContent = timeLeft;

      if (timeLeft <= 0) {
        endTest();
      }
    } else {
      timeLeft++;
      timeEl.textContent = timeLeft;
    }
  }, 1000);
}

// ---------------------
// End / Reset Test
// ---------------------
function endTest() {
  clearInterval(timer);
  isRunning = false;

  const finalWPM = calculateWPM();
  const finalAccuracy = calculateAccuracy();

  document.getElementById("final-wpm").textContent = finalWPM;
  document.getElementById("final-accuracy").textContent = `${finalAccuracy}%`;
  document.getElementById("final-chars").textContent =
    `${totalTyped - totalErrors}/${totalTyped}`;

  const resultsEl = document.getElementById("results");

  let message = "Test Complete! Keep pushing 🚀";

  if (personalBest === 0) {
    message = "Baseline Established!";
    personalBest = finalWPM;
  } else if (finalWPM > personalBest) {
    message = "High Score Smashed! 🎉";
    personalBest = finalWPM;
  }

  localStorage.setItem("personalBest", personalBest);
  document.getElementById("personal-best").textContent = personalBest;

  resultsEl.querySelector("p")?.remove();
  const msg = document.createElement("p");
  msg.textContent = message;
  resultsEl.prepend(msg);

  resultsEl.hidden = false;
}

function resetTest() {
  clearInterval(timer);

  timeLeft = 60;
  totalTyped = 0;
  totalErrors = 0;
  typedText = "";
  isRunning = false;

  timeEl.textContent = timeLeft;
  wpmEl.textContent = 0;
  accuracyEl.textContent = "100%";

  resultsEl.hidden = true;
  hintEl.style.display = "block";

  loadPassage();
}

// ---------------------
// Event Listeners
// ---------------------
document.addEventListener("keydown", (e) => {
  if (!isRunning) startTimer();

  if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
    typedText += e.key;
    totalTyped++;
    updateCharacters();
  }

  if (e.key === "Backspace") {
    typedText = typedText.slice(0, -1);
    updateCharacters();
  }

  // Passage mode end
  if (mode === "passage" && typedText.length === currentPassage.length) {
    endTest();
  }
});

restartBtn.addEventListener("click", resetTest);

// Difficulty buttons (if present)
document.getElementById("easy").addEventListener("click", () => {
  difficulty = "easy";
  setActiveDifficulty("easy");
  resetTest();
});

document.getElementById("medium").addEventListener("click", () => {
  difficulty = "medium";
  setActiveDifficulty("medium");
  resetTest();
});

document.getElementById("hard").addEventListener("click", () => {
  difficulty = "hard";
  setActiveDifficulty("hard");
  resetTest();
});

function setActiveDifficulty(level) {
  document.querySelectorAll(".difficulty-option").forEach(el => {
    el.classList.remove("active");
  });

  document.getElementById(level).classList.add("active");
}

function setActiveMode(selected) {
  document.querySelectorAll(".mode-option").forEach(el =>
    el.classList.remove("active")
  );
  document.getElementById(selected).classList.add("active");
}

document.getElementById("timed").addEventListener("click", () => {
  mode = "timed";
  timeLeft = 60;
  setActiveMode("timed");
  resetTest();
});

document.getElementById("passage-mode").addEventListener("click", () => {
  mode = "passage";
  timeLeft = 0;
  setActiveMode("passage-mode");
  resetTest();
});
