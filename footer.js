  document.getElementById("newsletter-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent page reload

    // Show success message
    const messageEl = document.getElementById("subscribe-message");
    messageEl.textContent = "Thank you for subscribing!";

    // Clear input fields
    this.reset();

    // Remove message after 3 seconds
    setTimeout(() => {
      messageEl.textContent = "";
    }, 3000);
  });
