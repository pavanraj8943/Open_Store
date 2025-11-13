const cartItems = document.getElementById("cartItems");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
cart = cart.map(item => ({ ...item, qty: item.qty || 1 }));

function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <h2>Your cart is empty </h2>
      <p style="text-align:center;">Add items to see them here</p>
    `;
    document.getElementById("itemCount").textContent = 0;
    document.getElementById("priceTotal").textContent = "₹0";
    document.getElementById("totalPrice").textContent = "₹0";
    document.getElementById("savingsText").textContent = "You will save ₹0 on this order";
    return;
  }

  const itemsHTML = cart.map(item => {
    const oldPrice = item.price * 1.4;
    const discount = Math.round(((oldPrice - item.price) / oldPrice) * 100);

    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-info">
          <h4>${item.title}</h4>
          <p>
            <span class="old-price">₹${(oldPrice * 83).toFixed(0)}</span>
            ₹${(item.price * 83 * item.qty).toLocaleString("en-IN")}
            <span class="offer">${discount}% off</span>
          </p>
          <div class="quantity-controls">
            <button onclick="decreaseQty(${item.id})">−</button>
            <span>${item.qty}</span>
            <button onclick="increaseQty(${item.id})">+</button>
          </div>
          <div >
            <span class="shipping-info">${item.ship}  </span>
          </div>
          <div class="cart-actions">
            <button onclick="removeFromCart(${item.id})">REMOVE</button>
          
          </div>
        </div>
      </div>
    `;
  }).join("");

  cartItems.innerHTML = itemsHTML;
  updateTotals();
}

function updateTotals() {
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * 83 * item.qty), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const discount = totalPrice * 0.15;
  const platformFee = 7;
  const finalAmount = totalPrice - discount + platformFee;

  document.getElementById("itemCount").textContent = totalItems;
  document.getElementById("priceTotal").textContent = "₹" + totalPrice.toLocaleString("en-IN");
  document.getElementById("totalPrice").textContent = "₹" + finalAmount.toLocaleString("en-IN");
  document.querySelector(".discount").textContent = "− ₹" + discount.toLocaleString("en-IN");
  document.getElementById("savingsText").textContent = `You will save ₹${discount.toLocaleString("en-IN")} on this order`;
}

function increaseQty(id) {
  cart = cart.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item);
  saveAndRender();
}

function decreaseQty(id) {
  cart = cart.map(item => item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item);
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

function checkout() {
  alert("Proceeding to checkout...");
}

renderCart();
