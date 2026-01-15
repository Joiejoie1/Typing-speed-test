// Quick test
console.log("App JS connected");

// Select DOM elements
const passageEl = document.getElementById("passage");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const timeEl = document.getElementById("time");

// 3️⃣ App state
let passages = [];
let currentPassage = "";
let typedText = "";

// 4️⃣ Fetch passage data
fetch("./data.json")
  .then(res => res.json())
  .then(data => {
    passages = data.easy; // start with easy
    loadPassage();
  });

// 5️⃣ Render a random passage
function loadPassage() {
  currentPassage =
    passages[Math.floor(Math.random() * passages.length)].text;

  passageEl.innerHTML = currentPassage
    .split("")
    .map(char => `<span>${char}</span>`)
    .join("");
}

// 6️⃣ Listen for typing (we’ll expand this later)
document.addEventListener("keydown", (e) => {
  if (e.key.length === 1) {
    typedText += e.key;
  }

  if (e.key === "Backspace") {
    typedText = typedText.slice(0, -1);
  }
});
