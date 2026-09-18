// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Simple order system
let order = [];
const orderCount = document.getElementById('orderCount');
const orderList = document.getElementById('orderList');
const orderTotal = document.getElementById('orderTotal');

function renderOrder() {
  orderCount.textContent = order.length;
  orderList.innerHTML = '';
  let total = 0;
  order.forEach((item, index) => {
    total += parseFloat(item.price);
    const li = document.createElement('li');
    li.innerHTML = `<span>${item.name} - $${item.price}</span>`;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '✕';
    removeBtn.style.cssText = 'border:none;background:none;cursor:pointer;font-size:1rem;';
    removeBtn.setAttribute('aria-label', 'Remove ' + item.name);
    removeBtn.onclick = () => {
      order.splice(index, 1);
      renderOrder();
    };
    li.appendChild(removeBtn);
    orderList.appendChild(li);
  });
  orderTotal.textContent = total.toFixed(2);
}

document.querySelectorAll('.add-btn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.menu-item');
    const name = card.getAttribute('data-name');
    const price = card.getAttribute('data-price');
    order.push({ name, price });
    renderOrder();
    btn.textContent = 'Added ✓';
    setTimeout(() => (btn.textContent = 'Add'), 800);
  });
});

document.getElementById('clearOrder').addEventListener('click', () => {
  order = [];
  renderOrder();
});

// Contact form
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('message').value.trim();
  const formMsg = document.getElementById('formMsg');
  if (!name || !message) {
    formMsg.style.color = 'red';
    formMsg.textContent = 'Please fill in both fields.';
    return;
  }
  formMsg.style.color = 'green';
  formMsg.textContent = `Thanks, ${name}! We'll reply soon. ☕`;
  e.target.reset();
});

renderOrder();
console.log('Welcome to Brew Haven! ☕');
