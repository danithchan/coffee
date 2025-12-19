let cart = [];

function addToCart(name, price, payment) {
  const existingItem = cart.find(item => item.name === name && item.payment === payment);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ name, price, qty: 1, payment });
  }
  updateCart();
}

function updateCart() {
  const cartBody = document.getElementById("cartBody");
  cartBody.innerHTML = "";

  let totalQty = 0;
  let totalPrice = 0;

  cart.forEach((item, index) => {
    totalQty += item.qty;
    totalPrice += item.price * item.qty;

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <button onclick="changeQty(${index}, -1)">-</button>
        ${item.qty}
        <button onclick="changeQty(${index}, 1)">+</button>
      </td>
      <td>${item.payment}</td>
      <td><button onclick="removeItem(${index})">Delete</button></td>
    `;

    cartBody.appendChild(tr);
  });

  document.getElementById("totalQty").textContent = totalQty;
  document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}