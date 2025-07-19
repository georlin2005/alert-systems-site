document.addEventListener('DOMContentLoaded', function () {
  // Theme Toggle Functionality
  const themeToggle = document.getElementById('theme-toggle');
  const icon = themeToggle.querySelector('i');
  let cursorLight = null;

  const currentTheme = localStorage.getItem('theme') || 'dark';
  const isLightInitially = currentTheme === 'light';

  // Apply saved theme
  if (isLightInitially) {
    document.body.classList.add('light-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
    createCursorLight();
  }

  updateLogos(isLightInitially);

  themeToggle.addEventListener('click', function () {
    const isLightMode = document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    icon.classList.replace(isLightMode ? 'fa-moon' : 'fa-sun', isLightMode ? 'fa-sun' : 'fa-moon');
    updateLogos(isLightMode);

    if (isLightMode) {
      if (cursorLight) {
        cursorLight.remove();
        cursorLight = null;
      }
    } else {
      if (!cursorLight) {
        createCursorLight();
      }
    }
  });

  function createCursorLight() {
    cursorLight = document.createElement('div');
    cursorLight.className = 'cursor-light';
    document.body.appendChild(cursorLight);

    document.addEventListener('mousemove', function (e) {
      if (cursorLight) {
        cursorLight.style.left = e.clientX + 'px';
        cursorLight.style.top = e.clientY + 'px';
      }
    });

    document.addEventListener('mouseout', function () {
      if (cursorLight) cursorLight.style.opacity = '0';
    });

    document.addEventListener('mouseover', function () {
      if (cursorLight) cursorLight.style.opacity = '0.7';
    });
  }

  function updateLogos(isLightMode) {
    const headerLogo = document.getElementById('header-logo');
    const footerLogo = document.getElementById('footer-logo');

    if (isLightMode) {
      headerLogo.src = headerLogo.getAttribute('data-light');
      footerLogo.src = footerLogo.getAttribute('data-light');
    } else {
      headerLogo.src = headerLogo.getAttribute('data-dark');
      footerLogo.src = footerLogo.getAttribute('data-dark');
    }
  }

// About Section Carousel
const aboutCarousel = document.querySelector('.about-section .image-carousel');
const aboutImages = aboutCarousel.querySelectorAll('.carousel-image');
const aboutPrevButton = aboutCarousel.querySelector('.carousel-button.prev');
const aboutNextButton = aboutCarousel.querySelector('.carousel-button.next');
let aboutIndex = 0;
let aboutInterval;
let aboutTimeout;

function showAboutImage(index) {
  aboutImages.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
}

function nextAboutImage() {
  aboutIndex = (aboutIndex + 1) % aboutImages.length;
  showAboutImage(aboutIndex);
}

function prevAboutImage() {
  aboutIndex = (aboutIndex - 1 + aboutImages.length) % aboutImages.length;
  showAboutImage(aboutIndex);
}

function startAboutInterval() {
  aboutInterval = setInterval(nextAboutImage, 5000);
}

function stopAboutInterval() {
  clearInterval(aboutInterval);
}

function handleAboutUserInteraction(actionFn) {
  stopAboutInterval();
  clearTimeout(aboutTimeout);
  actionFn();
  aboutTimeout = setTimeout(startAboutInterval, 3000); // resume after 3s
}

// Manual controls
aboutNextButton.addEventListener('click', () => handleAboutUserInteraction(nextAboutImage));
aboutPrevButton.addEventListener('click', () => handleAboutUserInteraction(prevAboutImage));

// Initialize
showAboutImage(aboutIndex);
startAboutInterval();




 // Vision Carousel Functionality
const visionImages = document.querySelectorAll('.vision-carousel .carousel-image');
const visionPrevButton = document.querySelector('.vision-carousel .carousel-button.prev');
const visionNextButton = document.querySelector('.vision-carousel .carousel-button.next');
let visionIndex = 0;
let visionInterval;
let visionTimeout;

// Show the image at the given index
function showVisionImage(index) {
  visionImages.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
}

// Move to next image
function nextVisionImage() {
  visionIndex = (visionIndex + 1) % visionImages.length;
  showVisionImage(visionIndex);
}

// Move to previous image
function prevVisionImage() {
  visionIndex = (visionIndex - 1 + visionImages.length) % visionImages.length;
  showVisionImage(visionIndex);
}

// Start auto slide
function startVisionInterval() {
  visionInterval = setInterval(nextVisionImage, 5000);
}

// Stop auto slide
function stopVisionInterval() {
  clearInterval(visionInterval);
}

// Pause auto slide when user interacts, and resume after 3 seconds
function handleUserInteraction(actionFn) {
  stopVisionInterval();
  clearTimeout(visionTimeout);
  actionFn(); // Perform next or previous action
  visionTimeout = setTimeout(startVisionInterval, 3000); // Resume after 3s
}

// Attach event listeners to buttons
visionNextButton.addEventListener('click', () => handleUserInteraction(nextVisionImage));
visionPrevButton.addEventListener('click', () => handleUserInteraction(prevVisionImage));

// Initialize
showVisionImage(visionIndex);
startVisionInterval();


// Mission Section Carousel
const missionCarousel = document.querySelector('.mission-section .mission-carousel');
const missionImages = missionCarousel.querySelectorAll('.mission-carousel-image');
const missionPrevButton = missionCarousel.querySelector('.carousel-button.prev');
const missionNextButton = missionCarousel.querySelector('.carousel-button.next');
let missionIndex = 0;
let missionInterval;
let missionTimeout;

function showMissionImage(index) {
  missionImages.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
}

function nextMissionImage() {
  missionIndex = (missionIndex + 1) % missionImages.length;
  showMissionImage(missionIndex);
}

function prevMissionImage() {
  missionIndex = (missionIndex - 1 + missionImages.length) % missionImages.length;
  showMissionImage(missionIndex);
}

function startMissionInterval() {
  missionInterval = setInterval(nextMissionImage, 5000);
}

function stopMissionInterval() {
  clearInterval(missionInterval);
}

function handleMissionUserInteraction(actionFn) {
  stopMissionInterval();
  clearTimeout(missionTimeout);
  actionFn();
  missionTimeout = setTimeout(startMissionInterval, 3000); // Restart after 3s
}

// Manual controls
missionNextButton.addEventListener('click', () => handleMissionUserInteraction(nextMissionImage));
missionPrevButton.addEventListener('click', () => handleMissionUserInteraction(prevMissionImage));

// Initialize
showMissionImage(missionIndex);
startMissionInterval();



  // Scroll animation for service cards
  const serviceCards = document.querySelectorAll('.service-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });

  serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
  });
});


// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('show');
});


// Enable swipe for all carousels
function setupSwipe(carousel) {
  let startX, moveX;
  const threshold = 50; // minimum swipe distance

  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchmove', (e) => {
    if (!startX) return;
    moveX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', () => {
    if (!startX || !moveX) return;
    
    const diffX = startX - moveX;
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        // Swipe left - next
        nextImage(carousel);
      } else {
        // Swipe right - previous
        prevImage(carousel);
      }
    }
    
    startX = null;
    moveX = null;
  }, { passive: true });
}

function nextImage(carousel) {
  const images = carousel.querySelectorAll('.carousel-image');
  let currentIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
  images[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.add('active');
}

function prevImage(carousel) {
  const images = carousel.querySelectorAll('.carousel-image');
  let currentIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
  images[currentIndex].classList.remove('active');
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  images[currentIndex].classList.add('active');
}

// Initialize swipe for all carousels
document.querySelectorAll('.image-carousel').forEach(setupSwipe);
