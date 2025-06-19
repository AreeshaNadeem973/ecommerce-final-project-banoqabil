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




let productDiv = document.querySelector(".product");
let CategoryListDiv = document.querySelector(".CategoryList");
let allProducts = [];

const showToast = (message) => {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
};

const renderProducts = (products) => {
  productDiv.innerHTML = "";

  products.forEach((element) => {
    const productHTML = `
      <div class="productItems">
        <img src="${element.image}" alt="${element.title}" />
        <h4>${element.category}</h4>
        <p>Price Rs. ${element.price} | ⭐ ${element.rating?.rate || "N/A"}</p>
        <h3>${element.title}</h3>
        <button type="button" class="add-to-cart">Add to Cart</button>
      </div>`;

    productDiv.innerHTML += productHTML;
  });

  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      showToast("✅ Product has been added to the cart!");
    });
  });
};

const displayProduct = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    allProducts = data.slice(0, 21); // Show only first 21 products
    console.log("Fetched Products:", allProducts);

    const categories = [...new Set(allProducts.map(item => item.category))];
    CategoryListDiv.innerHTML = "<hr/>" + categories.map(cat => `
      <label>
        <input type="checkbox" class="category-filter" data-category="${cat}" />
        ${cat}
      </label>
    `).join("");

    renderProducts(allProducts);

    document.querySelectorAll(".category-filter").forEach(checkbox => {
      checkbox.addEventListener("change", () => {
        const selected = Array.from(document.querySelectorAll(".category-filter:checked"))
          .map(cb => cb.dataset.category);

        const filtered = selected.length === 0
          ? allProducts
          : allProducts.filter(item => selected.includes(item.category));

        renderProducts(filtered);
      });
    });

  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

displayProduct();
