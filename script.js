// STEM Stars Academy - Interactive JavaScript

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initSmoothScrolling();
  initScrollAnimations();
  initMobileMenu();
  initHeaderScrollEffect();
  initParticleEffects();
  initLoadingScreen();
  initContactForm();
  initTypingEffect();
  initParallaxEffects();

  console.log("🚀 STEM Stars Academy loaded successfully!");
});

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });
}

// Scroll Animations with Intersection Observer
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Add staggered animation delays
        const children = entry.target.querySelectorAll(".scroll-animate");
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add("visible");
          }, index * 200);
        });
      }
    });
  }, observerOptions);

  // Observe all scroll-animate elements
  document.querySelectorAll(".scroll-animate").forEach((el) => {
    observer.observe(el);
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      this.classList.toggle("active");

      // Animate hamburger icon
      this.innerHTML = navMenu.classList.contains("active") ? "✕" : "☰";
    });
  }
}

// Close mobile menu function
function closeMobileMenu() {
  const navMenu = document.querySelector(".nav-menu");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");

  if (navMenu && mobileMenuBtn) {
    navMenu.classList.remove("active");
    mobileMenuBtn.classList.remove("active");
    mobileMenuBtn.innerHTML = "☰";
  }
}

// Header Scroll Effect
function initHeaderScrollEffect() {
  const header = document.querySelector(".header");
  const logo = document.querySelector(".logo");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");

  window.addEventListener("scroll", function () {
    const scrolled = window.scrollY > 100;

    if (scrolled) {
      header.classList.add("scrolled");
      logo.classList.add("scrolled");
      navLinks.forEach((link) => link.classList.add("scrolled"));
      if (mobileMenuBtn) mobileMenuBtn.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
      logo.classList.remove("scrolled");
      navLinks.forEach((link) => link.classList.remove("scrolled"));
      if (mobileMenuBtn) mobileMenuBtn.classList.remove("scrolled");
    }
  });
}

// Particle Effects for Hero Section
function initParticleEffects() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  function createParticle() {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random position
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";

    // Random animation delay and duration
    const delay = Math.random() * 6;
    const duration = Math.random() * 4 + 4;
    particle.style.animationDelay = delay + "s";
    particle.style.animationDuration = duration + "s";

    hero.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove();
      }
    }, (duration + delay) * 1000);
  }

  // Create particles periodically
  setInterval(createParticle, 2000);

  // Create initial particles
  for (let i = 0; i < 5; i++) {
    setTimeout(createParticle, i * 1000);
  }
}

// Loading Screen
function initLoadingScreen() {
  // Create loading screen
  const loadingScreen = document.createElement("div");
  loadingScreen.className = "loading";
  loadingScreen.innerHTML = '<div class="loading-spinner"></div>';
  document.body.appendChild(loadingScreen);

  // Hide loading screen after page load
  window.addEventListener("load", function () {
    setTimeout(() => {
      loadingScreen.classList.add("hidden");
      setTimeout(() => {
        loadingScreen.remove();
      }, 500);
    }, 1000);
  });
}

// Contact Form Handling
function initContactForm() {
  const contactForm = document.querySelector("#contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Show success message
    showNotification(
      "Thank you for your message! We'll get back to you soon.",
      "success"
    );

    // Reset form
    this.reset();
  });
}

// Typing Effect for Hero Title
function initTypingEffect() {
  const heroTitle = document.querySelector(".hero-title");
  if (!heroTitle) return;

  const text = heroTitle.textContent;
  heroTitle.textContent = "";

  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };

  // Start typing effect after a delay
  setTimeout(typeWriter, 1000);
}

// Parallax Effects
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll(".floating-element");

  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    parallaxElements.forEach((element) => {
      element.style.transform = `translateY(${rate}px)`;
    });
  });
}

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Style the notification
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "1rem 2rem",
    borderRadius: "10px",
    color: "white",
    fontWeight: "500",
    zIndex: "10000",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
    background: type === "success" ? "#10b981" : "#3b82f6",
  });

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Optimize scroll events
const optimizedScrollHandler = throttle(function () {
  // Header scroll effect
  const header = document.querySelector(".header");
  if (header) {
    const scrolled = window.scrollY > 100;
    header.classList.toggle("scrolled", scrolled);
  }

  // Parallax effects
  const parallaxElements = document.querySelectorAll(".floating-element");
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.3;

  parallaxElements.forEach((element) => {
    element.style.transform = `translateY(${rate}px)`;
  });
}, 16); // ~60fps

window.addEventListener("scroll", optimizedScrollHandler);

// Add some interactive hover effects
document.addEventListener("DOMContentLoaded", function () {
  // Add hover effects to cards
  const cards = document.querySelectorAll(".subject-card, .feature-item");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add click effects to buttons
  const buttons = document.querySelectorAll(".cta-button, .contact-item");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add CSS for ripple animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

document.addEventListener("keydown", function (e) {
  konamiCode.push(e.code);

  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }

  if (konamiCode.join(",") === konamiSequence.join(",")) {
    // Easter egg activated!
    document.body.style.animation = "rainbow 2s infinite";

    const style = document.createElement("style");
    style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
    document.head.appendChild(style);

    showNotification(
      "🎉 Easter egg activated! You found the secret!",
      "success"
    );
    konamiCode = [];
  }
});

// Performance optimization: Lazy load images
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener("DOMContentLoaded", initLazyLoading);
