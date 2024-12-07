$(document).ready(function () {
 
  let menuToggle = $('#menu-toggle');
  let menuClose = $('#menu-close');
  let mobileMenu = $('#mobile-menu');
  let mainNav = $('#mainNav');

  menuToggle.on('click', function () {
    mobileMenu.removeClass('hidden').addClass('flex').attr('aria-hidden', 'false');
    mainNav.addClass('hidden');
  });

  menuClose.on('click', function () {
    mobileMenu.removeClass('flex').addClass('hidden').attr('aria-hidden', 'true');
    mainNav.removeClass('hidden');
  });
});
