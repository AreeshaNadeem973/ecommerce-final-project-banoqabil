// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

// Initialize App
function initializeApp() {
  setupBackToTop();
  setupSmoothScrolling();
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Setup Back to Top Button
function setupBackToTop() {
  // Create button element
  const backToTopBtn = document.createElement("button");
  backToTopBtn.id = "backToTopBtn";
  backToTopBtn.innerHTML = "&#8679;"; // Up arrow ▲

  document.body.appendChild(backToTopBtn);

  // Show/hide button on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = "flex";
      backToTopBtn.style.opacity = "1";
    } else {
      backToTopBtn.style.opacity = "0";
      setTimeout(() => {
        if (window.scrollY <= 300) {
          backToTopBtn.style.display = "none";
        }
      }, 300);
    }
  });

  // Scroll smoothly to top on click
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}