document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const formObject = Object.fromEntries(formData.entries());
    console.log('Form submitted:', formObject);
    // Here you would typically send the data to a server
    alert('Thank you for your message. We will get back to you soon!');
    this.reset();
});