// This file runs in the BROWSER, not in Astro's frontmatter,
// so we DO have access to client side APIs like document.
const cart = [
  {id: 1, name: "Item 1", price:"10"},
  {id: 2, name: "Item 2", price:"15"},
  {id: 3, name: "Item 3", price:"12"}
]

function cartItemTemplate(item) {
  return `<li class="cart-item">
      <h4>${item.name}</h4>
      <p class="price">$${item.price}</p>
    </li>`;
}

function renderCart(items) {
  const element = document.querySelector("#cart");
  const total = items.reduce((sum, item) => sum + Number(item.price), 0);

  element.innerHTML = `
    <ul class="cart-list">
      ${items.map(cartItemTemplate).join("")}
    </ul>
    <p class="cart-total">Total: $${total}</p>`;
}

renderCart(cart);
