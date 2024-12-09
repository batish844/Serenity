const questions = [
  { question: "Which scent speaks to your soul?", options: ["Fresh Linen", "Warm Vanilla"] },
  { question: "What fragrance feels like home?", options: ["Zesty Lemon", "Lavender"] },
  { question: "Which aroma brings you joy?", options: ["Sweet Cupcake", "Earthy Sandalwood"] },
  { question: "What scent takes you on a getaway?", options: ["Ocean Breeze", "Spiced Cinnamon"] },
  { question: "Which fragrance helps you unwind?", options: ["Juicy Berry", "Eucalyptus Mint"] }
];

let currentQuestionIndex = 0;
let currentStep = 1;
const totalSteps = questions.length;

const questionEl = document.querySelector(".question");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const nextBtn = document.querySelector(".next-btn");

const progress = document.getElementById("progress");
const progressText = document.getElementById("progressText");

// Function to load the current question
function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  option1.querySelector("p").textContent = currentQuestion.options[0];
  option2.querySelector("p").textContent = currentQuestion.options[1];
  nextBtn.disabled = true;
  option1.style.background = "#fff";
  option2.style.background = "#fff";
}

// Function to enable the "Next" button
function enableNextButton() {
  nextBtn.disabled = false;
}

// Function to handle option selection
function handleOptionClick(event) {
  const selectedOption = event.currentTarget;
  option1.style.background = "#fff";
  option2.style.background = "#fff";
  selectedOption.style.background = "#e0e0e0";
  enableNextButton();
}

// Function to update the progress bar and text
function updateProgress() {
  const percentage = (currentStep / totalSteps) * 100;
  progress.style.width = `${percentage}%`;
  progressText.textContent = `${currentStep} of ${totalSteps}`;
}

// Event listeners for option selection
option1.addEventListener("click", handleOptionClick);
option2.addEventListener("click", handleOptionClick);

// Event listener for the "Next" button
nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      currentStep++;
      loadQuestion();
      updateProgress();
  } else {
      // End of quiz
      questionEl.textContent = "Thank you for completing the quiz!";
      document.querySelector(".options").style.display = "none";
      nextBtn.style.display = "none";
      progressText.textContent = "Quiz Completed!";
  }
});

// Initial load
loadQuestion();
updateProgress();
