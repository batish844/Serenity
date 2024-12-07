document.addEventListener('DOMContentLoaded', () => {
  // ===========================
  // Search Functionality
  // ===========================
  const searchIcon = document.querySelector('.search-icon');
  const searchInput = document.querySelector('.search-input');

  // Toggle search input visibility when search icon is clicked
  searchIcon.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent click from bubbling up
    searchInput.classList.toggle('active');
    if (searchInput.classList.contains('active')) {
      searchInput.focus();
    }
  });

  // Hide search input when clicking outside of it
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.search-input') && !event.target.closest('.search-icon')) {
      searchInput.classList.remove('active');
    }
  });

  // Hide search input when 'Esc' key is pressed
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      searchInput.classList.remove('active');
    }
  });

  // ===========================
  // Hamburger Menu Functionality
  // ===========================
  const menuToggle = document.getElementById('menu-toggle'); // Hamburger button
  const menuClose = document.getElementById('menu-close'); // Close button inside mobile menu
  const mobileMenu = document.getElementById('mobile-menu'); // Mobile menu container

  // Open Mobile Menu
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent click from bubbling up
    mobileMenu.classList.remove('hidden');
    mobileMenu.classList.add('flex');
  });

  // Close Mobile Menu
  menuClose.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent click from bubbling up
    mobileMenu.classList.remove('flex');
    mobileMenu.classList.add('hidden');
  });

  // Close Mobile Menu when clicking outside of it
  document.addEventListener('click', (event) => {
    if (
      !event.target.closest('#mobile-menu') &&
      !event.target.closest('#menu-toggle') &&
      !event.target.closest('.serenity-logo') // Optional: Close when clicking the logo
    ) {
      mobileMenu.classList.remove('flex');
      mobileMenu.classList.add('hidden');
    }
  });

  // ===========================
  // Testimonials Carousel Functionality
  // ===========================
  const testimonialItems = document.querySelectorAll('.testimonial-item');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  let currentIndex = 0;
  let testimonialInterval;

  // Function to update testimonials' classes
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

  // Function to show next testimonial
  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonialItems.length;
    updateTestimonials();
  }

  // Function to show previous testimonial
  function prevTestimonial() {
    currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
    updateTestimonials();
  }

  // Event Listeners for Carousel Buttons
  prevButton.addEventListener('click', () => {
    prevTestimonial();
    resetInterval();
  });

  nextButton.addEventListener('click', () => {
    nextTestimonial();
    resetInterval();
  });

  // Automatic Carousel Rotation
  function startInterval() {
    testimonialInterval = setInterval(nextTestimonial, 5000);
  }

  function resetInterval() {
    clearInterval(testimonialInterval);
    startInterval();
  }

  // Initialize Carousel
  updateTestimonials();
  startInterval();

  // Pause Carousel on Hover (Optional)
  const testimonialCarousel = document.querySelector('.testimonial-carousel');

  testimonialCarousel.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
  });

  testimonialCarousel.addEventListener('mouseleave', () => {
    startInterval();
  });
});
