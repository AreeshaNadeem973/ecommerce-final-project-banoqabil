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

// shop.js
let productDiv = document.querySelector(".product");
let allProducts = [];
let filterListenersAdded = false;

const showToast = (message) => {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2000);
};

const renderProducts = (products) => {
  console.clear();
  console.log("Rendering Products:", products);
  productDiv.innerHTML = "";

  products.forEach((element) => {
    const productHTML = `
      <div class="productItems">
        <img src="${element.image}" alt="${element.title}" />
        <h4>${element.category}</h4>
        <p>Price Rs. ${element.price} | ⭐ ${element.rating?.rate || "4.0"}</p>
        <h3>${element.title}</h3>
        <button class="add-to-cart">Add to Cart</button>
      </div>`;
    productDiv.innerHTML += productHTML;
  });

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      showToast("✅ Product has been added to the cart!");
    });
  });
};

const displayProduct = async () => {
  try {
    const response = await fetch("https://mocki.io/v1/eb97e89e-5ed0-4cbd-8e15-7634c7da0907");
    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();
    allProducts = data.slice(0, 21);
    console.log("Fetched 21 Products:", allProducts);
    renderProducts(allProducts);

    if (!filterListenersAdded) {
      const filterButtons = document.querySelectorAll(".filter-btn");
      filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
          filterButtons.forEach((btn) => btn.classList.remove("active"));
          button.classList.add("active");

          const filterValue = button.getAttribute("data-filter");
          if (filterValue === "all") {
            renderProducts(allProducts);
          } else {
            const filtered = allProducts.filter((product) =>
              product.category.toLowerCase() === filterValue
            );
            renderProducts(filtered);
          }
        });
      });
      filterListenersAdded = true;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

displayProduct();