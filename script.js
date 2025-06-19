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

// Function to create and show popup message
function showPopupMessage(message) {
    // Create popup element
    const popup = document.createElement('div');
    popup.className = 'popup-message';
    popup.innerHTML = `<p>${message}</p>`;
    
    // Add popup to the body
    document.body.appendChild(popup);
    
    // Show popup with animation
    setTimeout(() => {
        popup.classList.add('show');
    }, 100);
    
    // Remove popup after 3 seconds
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(popup);
        }, 300);
    }, 3000);
}

// Add click event listeners to all Add to Cart buttons
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productName = button.closest('.product-card').querySelector('h3').textContent;
            showPopupMessage(`Added ${productName} to cart!`);
        });
    });
}); 