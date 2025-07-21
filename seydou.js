document.addEventListener("DOMContentLoaded", function () {
  const placeOrderBtn = document.getElementById("placeOrderBtn");
  const checkoutPanel = document.getElementById("checkoutPanel");
  const closePanelBtn = document.getElementById("closePanelBtn");
  const totalCostEl = document.getElementById("totalCost");
  const checkoutItems = document.getElementById("checkoutItems");

  function updateTotal() {
    const items = document.querySelectorAll(".cart-item");
    let total = 0;
    checkoutItems.innerHTML = "";

    items.forEach(item => {
      const name = item.querySelector(".fw-bold.text-dark").textContent.trim();
      const price = parseFloat(item.dataset.price);
      const count = parseInt(item.querySelector(".count").textContent);
      const subtotal = price * count;
      total += subtotal;

      const line = document.createElement("div");
      line.className = "d-flex justify-content-between align-items-center border-bottom py-2";
      line.innerHTML = `
        <div>${name} × ${count}</div>
        <div>$${subtotal.toFixed(2)}</div>
      `;
      checkoutItems.appendChild(line);
    });

    totalCostEl.textContent = total.toFixed(2);
  }

  document.querySelectorAll(".plus").forEach(btn => {
    btn.addEventListener("click", () => {
      const countEl = btn.parentElement.querySelector(".count");
      countEl.textContent = parseInt(countEl.textContent) + 1;
      updateTotal();
    });
  });

  document.querySelectorAll(".minus").forEach(btn => {
    btn.addEventListener("click", () => {
      const countEl = btn.parentElement.querySelector(".count");
      let count = parseInt(countEl.textContent);
      if (count > 1) {
        countEl.textContent = count - 1;
        updateTotal();
      }
    });
  });

  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".cart-item").remove();
      updateTotal();
    });
  });

  placeOrderBtn.addEventListener("click", function () {
    checkoutPanel.classList.remove("d-none", "animate__slideOutDown");
    checkoutPanel.classList.add("animate__slideInUp");
    updateTotal();
  });

  closePanelBtn.addEventListener("click", function () {
    checkoutPanel.classList.remove("animate__slideInUp");
    checkoutPanel.classList.add("animate__slideOutDown");
    checkoutPanel.addEventListener("animationend", () => {
      checkoutPanel.classList.add("d-none");
    }, { once: true });
  });
});
