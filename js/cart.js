const cartItems = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart = cart.map(item => ({ ...item, qty: item.qty || 1 }));

function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceEl.textContent = "";
        return;
    }

    cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.images ? item.images[0] : item.image}" alt="${item.title}">
      <div class="cart-info">
        <h4>${item.title}</h4>

        <p>  
        <span class="old-price">
            ₹${((item.price * 1.4) * 83 * item.qty).toFixed(0)}
          </span>
          ₹${(item.price * 83 * item.qty).toLocaleString()}
         <span class="offer">${data.discountPercentage}% off</span>
        </p>

        <div class="quantity-controls">
          <button onclick="decreaseQty(${item.id})">−</button>
          <span>${item.qty}</span>
          <button onclick="increaseQty(${item.id})">+</button>
        </div>
      </div>

      <div class="cart-actions">
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    </div>
  `).join("");

    updateTotal();
}

function updateTotal() {
    const total = cart.reduce((sum, item) =>
        sum + (item.price * 83 * item.qty), 0
    );

    totalPriceEl.textContent = "Total: ₹" + total.toLocaleString();
}

function increaseQty(id) {
    cart = cart.map(item =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    saveAndRender();
}

function decreaseQty(id) {
    cart = cart.map(item =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
    );
    saveAndRender();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

renderCart();
