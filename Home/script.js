//Testimonial slider 

const testimonialItems = document.querySelectorAll('.testimonial-item');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentIndex = 0;

function updateTestimonials() {
    testimonialItems.forEach((testimonial, index) => {
        testimonial.classList.remove('active', 'left', 'right');
        if (index === currentIndex) {
            testimonial.classList.add('active');
        } else if (index === (currentIndex - 1 + testimonialItems.length) % testimonialItems.length) {
            testimonial.classList.add('left');
        } else if (index === (currentIndex + 1) % testimonialItems.length) {
            testimonial.classList.add('right');
        }
    });
}

function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonialItems.length;
    updateTestimonials();
}

function prevTestimonial() {
    currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
    updateTestimonials();
}

prevButton.addEventListener('click', prevTestimonial);
nextButton.addEventListener('click', nextTestimonial);

setInterval(nextTestimonial, 5000);
updateTestimonials();