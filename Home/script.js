const searchIcon = document.querySelector('.search-icon');
const searchInput = document.querySelector('.search-input');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navMainGroup = document.querySelector('.nav-main-group');

// Toggle search input visibility when search icon is clicked
searchIcon.addEventListener('click', () => {
  searchInput.classList.toggle('active');
  searchInput.focus();
});

// Hide search input when 'Esc' key is pressed
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    searchInput.classList.remove('active');
  }
});

// Toggle hamburger menu
hamburgerMenu.addEventListener('click', () => {
  navMainGroup.classList.toggle('active');
  hamburgerMenu.classList.toggle('active');
});

// Close hamburger menu when clicking outside
document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav-main-group') && !event.target.closest('.hamburger-menu')) {
    navMainGroup.classList.remove('active');
    hamburgerMenu.classList.remove('active');
  }
});

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
//right
function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonialItems.length;
    updateTestimonials();
}


//left
function prevTestimonial() {
    currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
    updateTestimonials();
}

prevButton.addEventListener('click', prevTestimonial);
nextButton.addEventListener('click', nextTestimonial);

setInterval(nextTestimonial, 5000);
updateTestimonials();