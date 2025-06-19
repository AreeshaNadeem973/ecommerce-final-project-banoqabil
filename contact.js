// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

// Initialize App
function initializeApp() {
  setupBackToTop();
  setupSmoothScrolling();
  setupContactForm();
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
  const backToTopBtn = document.createElement("button");
  backToTopBtn.id = "backToTopBtn";
  backToTopBtn.innerHTML = "&#8679;"; // Up arrow
  document.body.appendChild(backToTopBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Setup Contact Form
function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (form) {
    const msg = document.createElement("p");
    msg.textContent = "Message sent successfully!";
    msg.style.display = "none";
    form.appendChild(msg);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const { name, email, message } = form.elements;

      if (!name.value || !email.value || !message.value) {
        alert("Please fill in all fields.");
        return;
      }

      console.log("Name:", name.value);
      console.log("Email:", email.value);
      console.log("Message:", message.value);

      msg.style.display = "block";
      form.reset();

      setTimeout(() => {
        msg.style.display = "none";
      }, 5000);
    });
  }
}
