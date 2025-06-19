let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let nameField = document.getElementById("nameField");
let title = document.getElementById("title");
let toast = document.getElementById("toast");
let passwordField = document.getElementById("password");

let isSignUp = true;

signinBtn.onclick = function () {
  nameField.style.display = "none";
  title.innerText = "Sign In";
  signupBtn.classList.add("disable");
  signinBtn.classList.remove("disable");
  isSignUp = false;
};

signupBtn.onclick = function () {
  nameField.style.display = "flex";
  title.innerText = "Sign Up";
  signupBtn.classList.remove("disable");
  signinBtn.classList.add("disable");
  isSignUp = true;
};

function togglePassword() {
  const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);
}

function showToast(message) {
  toast.innerText = message;
  toast.style.display = "block";
  toast.classList.add("fadeInOut");
  setTimeout(() => {
    toast.style.display = "none";
    toast.classList.remove("fadeInOut");
  }, 2000);
}

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
});

signupBtn.addEventListener("click", () => {
  if (isSignUp) {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value.trim();
    if (name && email && pass) {
      showToast("Account created!");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    } else {
      alert("Please fill in all fields.");
    }
  }
});

signinBtn.addEventListener("click", () => {
  if (!isSignUp) {
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value.trim();
    if (email && pass) {
      showToast("Welcome back!");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    } else {
      alert("Email and Password are required.");
    }
  }
});
