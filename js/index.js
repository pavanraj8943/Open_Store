const categories = [
  "All", "beauty", "fragrances", "furniture", "groceries", "home-decoration",
  "kitchen-accessories", "laptops", "mens-shirts", "mens-shoes", "mens-watches",
  "mobile-accessories", "motorcycle", "skin-care", "smartphones", "sports-accessories",
  "sunglasses", "tablets", "tops", "vehicle", "womens-bags",
  "womens-dresses", "womens-jewellery", "womens-shoes", "womens-watches"
];

let allProducts = []; 

function renderCategories() {
  const container = document.getElementById("categories");
  container.innerHTML = categories.map(cat => `
    <button class="category-btn" onclick="filterByCategory('${cat}')">
      ${cat.replace(/-/g, ' ')}
    </button>
  `).join("");
}


async function fetchData() {
  try {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
    allProducts = data.products;
    renderProducts(allProducts);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function renderProducts(products) {
  const container = document.getElementById("cards");
  container.innerHTML = products.map(ele => {
    const priceINR = (ele.price * 83).toFixed(0);
    const oldPriceINR = (ele.price * 1.4 * 83).toFixed(0);

    return `
      <div class="card">
        <a href="./product.html?id=${ele.id}">
          <img src="${ele.thumbnail}" alt="${ele.title}">
          <h1>${ele.title}</h1>
          <p class="price">
            <span class="priceIn">₹${priceINR}</span>
            <span class="old-price">₹${oldPriceINR}</span>
            <span class="offer">${Math.round((1 - ele.price / (ele.price * 1.4)) * 100)}% off</span>
          </p>
          <p class="star" >${ele.rating} <span> ★ </span> </p>
        </a>
      </div>
    `;
  }).join("");
}


    function searchProducts(query) {
    const filtered = allProducts.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase())
    );
    renderProducts(filtered);
    }

    async function filterByCategory(category) {
    if (category === "All") {
        renderProducts(allProducts);
        return;
    }

    try {
        const res = await fetch(`https://dummyjson.com/products/category/${category}`);
        const data = await res.json();
        renderProducts(data.products);
    } catch (error) {
        console.error("Error filtering category:", error);
    }
    }

    document.getElementById("searchBtn").addEventListener("click", () => {
    const query = document.getElementById("searchInput").value.trim();
    searchProducts(query);
    });

    document.getElementById("searchInput").addEventListener("input", (e) => {
    const query = e.target.value.trim();
    if (query === "") renderProducts(allProducts);
    else searchProducts(query);
    });


renderCategories();
fetchData();
