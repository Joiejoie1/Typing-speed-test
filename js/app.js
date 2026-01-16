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
let totalTyped = 0;
let totalErrors =0;

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

  passageEl.innerHTML = "";

  currentPassage.split("").forEach(char => {
    const span = document.createElement("span");
    span.textContent = char;
    passageEl.appendChild(span);
  });

}

// Compare typed characters to passage
function updateCharacters() {
  const spans = passageEl.querySelectorAll("span");

    spans.forEach((span, index) => {
      const typedChar = typedText[index];
      const expectedChar = currentPassage[index];

      // Reset styles
      span.classList.remove("correct", "incorrect", "cursor");

      if (typedChar == null) {
        // nothing typed yet
        if (index === typedText.length) {
          span.classList.add("cursor");
        }
        return;
}

      if (typedChar === expectedChar) {
        span.classList.add("correct");
      } else {
        span.classList.add("incorrect");
      }
    });
  }

// 6️⃣ Listen for typing (we’ll expand this later)
document.addEventListener("keydown", (e) => {
  if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
    typedText += e.key;
    totalTyped++;
    updateCharacters();
  }

  if (e.key === "Backspace") {
    typedText = typedText.slice(0, -1);
    updateCharacters();
  }
});
