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

let countries = Object.keys(quizData);
countries = countries.sort(() => Math.random() - 0.5);

let current = 0;
let score = 0;

const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
answerEl.addEventListener('paste', e => e.preventDefault());
const submitBtn = document.getElementById('submit');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const nextBtn = document.getElementById('next');

function showQuestion() {
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";
  answerEl.value = "";
  answerEl.disabled = false;
  submitBtn.disabled = false;
  questionEl.textContent = `What is the capital of ${countries[current]}?`;
}

function checkAnswer() {
  const userAnswer = answerEl.value.trim().toLowerCase();
  const correctAnswer = quizData[countries[current]].toLowerCase();

  // Disable further editing / submissions
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

submitBtn.addEventListener('click', checkAnswer);
nextBtn.addEventListener('click', nextQuestion);
showQuestion();