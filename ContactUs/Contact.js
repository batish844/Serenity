// Show answers
document.querySelectorAll('.Quick-help-button').forEach(button => {
    button.addEventListener('click', () => {
        const answerContainer = button.closest('.Quick-help-Question').querySelector('.Quick-help-Answer');
        
        if (answerContainer.style.maxHeight && answerContainer.style.maxHeight !== '0px') {
            answerContainer.style.maxHeight = '0';
            button.innerHTML = '<i class="fas fa-angle-down"></i>'; // Down arrow 
        } else {
            answerContainer.style.maxHeight = answerContainer.scrollHeight + 'px'; //auto width
            button.innerHTML = '<i class="fas fa-angle-up"></i>'; // Up arrow 
        }
    });
});


// Form
const form = document.querySelector("#contactForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", function (event) {
  event.preventDefault(); 

  const name = form.querySelector('input[placeholder="Name"]').value;
  const email = form.querySelector('input[placeholder="Email"]').value;
  const subject = form.querySelector('input[placeholder="Subject"]').value;
  const message = form.querySelector('textarea').value;

  const feedback = {
    name,
    email,
    subject,
    message,
    date: new Date().toLocaleString(), 
  };

  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
  
  feedbacks.push(feedback);
  
  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

  successMessage.classList.remove("hidden");
  
  form.reset();

  setTimeout(() => {
    successMessage.classList.add("hidden");
  }, 3000);
});
