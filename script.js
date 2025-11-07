const quizData = {
  "Yemen": "Sana'a",
  "Oman": "Muscat",
  "Saudi Arabia": "Riyadh",
  "United Arab Emirates": "Abu Dhabi",
  "Qatar": "Doha",
  "Bahrain": "Manama",
  "Kuwait": "Kuwait City",
  "Jordan": "Amman",
  "Israel": "Jerusalem",
  "Lebanon": "Beirut",
  "Syria": "Damascus",
  "Iraq": "Baghdad",
  "Iran": "Tehran",
  "Turkey": "Ankara",
  "Azerbaijan": "Baku",
  "Armenia": "Yerevan",
  "Georgia": "Tbilisi",
  "Russia": "Moscow",
  "Kazakhstan": "Astana",
  "Kyrgyzstan": "Bishkek",
  "Uzbekistan": "Tashkent",
  "Turkmenistan": "Ashgabat",
  "Tajikistan": "Dushanbe",
  "China": "Beijing",
  "Afghanistan": "Kabul",
  "Pakistan": "Islamabad",
  "India": "New Delhi",
  "Nepal": "Kathmandu"
};

// --- Shared Setup ---
let countries = Object.keys(quizData);
countries = countries.sort(() => Math.random() - 0.5);

// Quiz elements
let current = 0;
let score = 0;
let answered = false;
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const submitBtn = document.getElementById('submit');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const nextBtn = document.getElementById('next');

// Flashcard elements
const flashcard = document.getElementById('flashcard');
const flashText = document.getElementById('flashText');
const nextFlash = document.getElementById('nextFlash');

// Mode buttons
const quizSection = document.getElementById('quizSection');
const flashSection = document.getElementById('flashSection');
const quizModeBtn = document.getElementById('quizModeBtn');
const flashModeBtn = document.getElementById('flashModeBtn');

// --- Quiz Mode ---
answerEl.addEventListener('paste', e => e.preventDefault());

function showQuestion() {
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";
  answerEl.value = "";
  answerEl.disabled = false;
  submitBtn.disabled = false;
  answered = false;
  questionEl.textContent = `What is the capital of ${countries[current]}?`;
}

function checkAnswer() {
  if (answered) return;
  answered = true;
  const userAnswer = answerEl.value.trim().toLowerCase();
  const correctAnswer = quizData[countries[current]].toLowerCase();

  answerEl.disabled = true;
  submitBtn.disabled = true;

  if (userAnswer === correctAnswer) {
    feedbackEl.textContent = "✅ Correct!";
    feedbackEl.style.color = "green";
    score++;
  } else {
    feedbackEl.textContent = `❌ Incorrect. The correct answer is ${quizData[countries[current]]}.`;
    feedbackEl.style.color = "red";
  }

  scoreEl.textContent = `Score: ${score}/${countries.length}`;
  nextBtn.style.display = "inline-block";
}

function nextQuestion() {
  current++;
  if (current < countries.length) {
    showQuestion();
  } else {
    questionEl.textContent = "🎉 Quiz complete!";
    feedbackEl.textContent = `Final Score: ${score}/${countries.length}`;
    submitBtn.style.display = "none";
    nextBtn.style.display = "none";
    answerEl.style.display = "none";
  }
}

// --- Flashcard Mode ---
let flashIndex = 0;
let showingCapital = false;

function showFlashcard() {
  showingCapital = false;
  flashText.textContent = countries[flashIndex];
  flashcard.classList.remove('flipped');
}

function flipFlashcard() {
  showingCapital = !showingCapital;
  flashText.textContent = showingCapital
    ? quizData[countries[flashIndex]]
    : countries[flashIndex];
}

function nextFlashcard() {
  flashIndex = (flashIndex + 1) % countries.length;
  showFlashcard();
}

// Flip on click or SPACE
flashcard.addEventListener('click', flipFlashcard);
document.addEventListener('keydown', e => {
  if (e.code === 'Space' && flashSection.style.display !== 'none') {
    e.preventDefault();
    flipFlashcard();
  }
});
nextFlash.addEventListener('click', nextFlashcard);

// --- Mode Switching ---
quizModeBtn.addEventListener('click', () => {
  quizSection.style.display = "block";
  flashSection.style.display = "none";
});
flashModeBtn.addEventListener('click', () => {
  quizSection.style.display = "none";
  flashSection.style.display = "block";
  showFlashcard();
});

// Start quiz by default
submitBtn.addEventListener('click', checkAnswer);
nextBtn.addEventListener('click', nextQuestion);
showQuestion();