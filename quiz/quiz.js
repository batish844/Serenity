const questions = [
    {
      question: "Which scent speaks to your soul?",
      options: ["Fresh Linen", "Warm Vanilla"]
    },
    {
      question: "What fragrance feels like home?",
      options: ["Zesty Lemon", "Lavender"]
    },
    {
      question: "Which aroma brings you joy?",
      options: ["Sweet Cupcake", "Earthy Sandalwood"]
    },
    {
      question: "What scent takes you on a getaway?",
      options: ["Ocean Breeze", "Spiced Cinnamon"]
    },
    {
      question: "Which fragrance helps you unwind?",
      options: ["Juicy Berry", "Eucalyptus Mint"]
    }
  ];
  
  let currentQuestionIndex = 0;
  const questionEl = document.querySelector(".question");
  const option1 = document.getElementById("option1");
  const option2 = document.getElementById("option2");
  const nextBtn = document.querySelector(".next-btn");
  
  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    option1.querySelector("p").textContent = currentQuestion.options[0];
    option2.querySelector("p").textContent = currentQuestion.options[1];
  }
  
  function enableNextButton() {
    nextBtn.disabled = false;
  }
  
  function handleOptionClick(event) {
    const selectedOption = event.target;
    selectedOption.style.background = "#e0e0e0";  // Mark the selected option
    enableNextButton();
    // You could save the selected answer here if needed
  }
  
  option1.addEventListener("click", handleOptionClick);
  option2.addEventListener("click", handleOptionClick);
  
  nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      loadQuestion();
      nextBtn.disabled = true;
      option1.style.background = "#fff";  // Reset background
      option2.style.background = "#fff";  // Reset background
    } else {
      // End of quiz
      questionEl.textContent = "Thank you for completing the quiz!";
      document.querySelector(".options").style.display = "none";
      nextBtn.style.display = "none";
    }
  });
  
  loadQuestion();