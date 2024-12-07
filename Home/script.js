document.addEventListener('DOMContentLoaded', () => {
 
  const searchIcon = document.querySelector('.search-icon');
  const searchInput = document.querySelector('.search-input');

  searchIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    searchInput.classList.toggle('active');
    if (searchInput.classList.contains('active')) {
      searchInput.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.search-input') && !event.target.closest('.search-icon')) {
      searchInput.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      searchInput.classList.remove('active');
    }
  });


  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close'); 
  const mobileMenu = document.getElementById('mobile-menu'); 

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation(); 
    mobileMenu.classList.remove('hidden');
    mobileMenu.classList.add('flex');
  });

  menuClose.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.remove('flex');
    mobileMenu.classList.add('hidden');
  });

  document.addEventListener('click', (event) => {
    if (
      !event.target.closest('#mobile-menu') &&
      !event.target.closest('#menu-toggle') &&
      !event.target.closest('.serenity-logo')
    ) {
      mobileMenu.classList.remove('flex');
      mobileMenu.classList.add('hidden');
    }
  });

  
  const testimonialItems = document.querySelectorAll('.testimonial-item');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  let currentIndex = 0;
  let testimonialInterval;

  function updateTestimonials() {
    testimonialItems.forEach((testimonial, index) => {
      testimonial.classList.remove('active', 'left', 'right');
      if (index === currentIndex) {
        testimonial.classList.add('active');
      } else if (
        index === (currentIndex - 1 + testimonialItems.length) % testimonialItems.length
      ) {
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

  prevButton.addEventListener('click', () => {
    prevTestimonial();
    resetInterval();
  });

  nextButton.addEventListener('click', () => {
    nextTestimonial();
    resetInterval();
  });

  function startInterval() {
    testimonialInterval = setInterval(nextTestimonial, 5000);
  }

  function resetInterval() {
    clearInterval(testimonialInterval);
    startInterval();
  }

  updateTestimonials();
  startInterval();

  const testimonialCarousel = document.querySelector('.testimonial-carousel');

  testimonialCarousel.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
  });

  testimonialCarousel.addEventListener('mouseleave', () => {
    startInterval();
  });
});
