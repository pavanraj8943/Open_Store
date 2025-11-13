const params = new URLSearchParams(window.location.search);
const id = params.get("id");
displayProduct(id);

async function displayProduct(id) {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await res.json();


    data.warrantyInformation = data.warrantyInformation || "No warranty available";
    data.returnPolicy = data.returnPolicy || "7-day return policy";


    const fullStars = Math.floor(data.rating);
    const halfStar = data.rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    let stars = "";
    for (let i = 0; i < fullStars; i++) stars += '<span class="star full">★</span>';
    if (halfStar) stars += '<span class="star half">★</span>';
    for (let i = 0; i < emptyStars; i++) stars += '<span class="star empty">☆</span>';


    const productImages = data.images?.length ? data.images : ["https://via.placeholder.com/400"];

    const thumbs = productImages
      .map((img, i) => `<img src="${img}" class="thumb ${i === 0 ? "active" : ""}" alt="thumb">`)
      .join("");

const reviews = data.reviews || [];

const reviewsHTML = reviews.length
  ? reviews
      .map(
        (r) => `
      <div class="review">
        <div class="review-header">
          <div class="stars">${"★".repeat(r.rating)}</div>
        </div>
        <p class="review-comment">${r.comment}</p>
        <div class="review-footer">
          <span class="review-user">${r.reviewerName} <span class="verified">✔ Verified Buyer</span></span>
          <span class="review-date">${new Date(r.date).toLocaleDateString()}</span>
        </div>
      </div>`
      )
      .join("")
  : `<p class="no-reviews">No reviews available</p>`;

    const priceINR = (data.price * 83).toLocaleString();

    document.title = `${data.title} | My Store`;


    document.getElementById("product").innerHTML = `
      <div class="product-page">
        <div class="left-section">
          <div class="thumbs">${thumbs}</div>
          <div class="main-image">
            <img id="mainImg" src="${productImages[0]}" alt="${data.title}">
            <div class="buttons">
              <button id="cartbtn" class="cart-btn">ADD TO CART</button>
              <button class="buy-btn">BUY NOW</button>
            </div>
          </div>
        </div>

        <div class="right-section">
          <h1 class="title">${data.title}</h1>
          <p class="brand">Brand: ${data.brand}</p>

          <div class="rating">${stars} <span>(${data.rating})</span></div>

          <p class="price">
            ₹${priceINR}
            <span class="old-price">₹${(data.price * 1.4 * 83).toFixed(0)}</span>
            <span class="offer">${data.discountPercentage}% off</span>
          </p>

          <div class="highlight">
            <h3>Highlights</h3>
            <ul>
              <li>Category: ${data.category}</li>
              <li>In Stock: ${data.stock}</li>
              <li>Warranty: ${data.warrantyInformation}</li>
              <li>Return: ${data.returnPolicy}</li>
            </ul>
          </div>

          <div class="desc">
            <h3>Description</h3>
            <p>${data.description}</p>
          </div>

          <div class="specs">
            <h3>Specifications</h3>
            <table>
              <tr><th>Brand</th><td>${data.brand}</td></tr>
              <tr><th>Category</th><td>${data.category}</td></tr>
              <tr><th>Stock</th><td>${data.stock}</td></tr>
              <tr><th>Price</th><td>₹${priceINR}</td></tr>
              <tr><th>Discount</th><td>${data.discountPercentage}%</td></tr>
              <tr><th>Rating</th><td>${data.rating}</td></tr>
            </table>
          </div>

          <div class="reviews">
            <h3>Customer Reviews</h3>
            ${reviewsHTML}
          </div>
        </div>
      </div>
    `;


    document.querySelectorAll(".thumb").forEach((thumb) => {
      thumb.addEventListener("mousemove", () => {
        document.getElementById("mainImg").src = thumb.src;
        document.querySelectorAll(".thumb").forEach((t) => t.classList.remove("active"));
        thumb.classList.add("active");
      });
    });


      const cartBtn = document.getElementById("cartbtn");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const alreadyInCart = cart.some(item => item.id === data.id);

    if (alreadyInCart) {
      cartBtn.textContent = "VIEW CART";
      cartBtn.classList.add("view-cart");
    } else {
      cartBtn.textContent = "ADD TO CART";
    }

  cartBtn.addEventListener("click", () => {
  if (cartBtn.textContent === "ADD TO CART") {
    cart.push({
      id: data.id,
      title: data.title,
      price: data.price,
      image: data.images[0],
      quantity: 1
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    cartBtn.textContent = "VIEW CART";
    cartBtn.classList.add("view-cart");
  } else {
    window.location.href = "cart.html"; 
  }
})
    QRCode.toCanvas(
      document.getElementById("qrcode"),
      window.location.href,
      { width: 150 },
      function (error) {
        if (error) console.error(error);
      }
    );
  } catch (error) {
    console.error("Error fetching product:", error);
  }
}
