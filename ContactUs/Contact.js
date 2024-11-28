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
