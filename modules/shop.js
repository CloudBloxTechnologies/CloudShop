import { db, auth } from "../firebase/config.js";
import { ref, onValue, get, update } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { emailToKey } from "../firebase/utils.js";

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  loadProducts(searchInput.value.toLowerCase());
});

onAuthStateChanged(auth, user => {
  if (!user) window.location.href = "index.html";
});

function loadProducts(filter = "") {
  const productsRef = ref(db, "products");

  onValue(productsRef, snap => {
    productList.innerHTML = "";
    const products = snap.val();

    for (let id in products) {
      const product = products[id];
      if (product.name.toLowerCase().includes(filter)) {
        const div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <h3>${product.name}</h3>
          <p>${product.price} Credits</p>
          <button onclick="buyProduct('${id}')">Buy</button>
        `;
        productList.appendChild(div);
      }
    }
  });
}

window.buyProduct = async function (productId) {
  const user = auth.currentUser;
  if (!user) return alert("Please log in first.");

  const emailKey = emailToKey(user.email);
  const userRef = ref(db, `users/${emailKey}`);
  const productRef = ref(db, `products/${productId}`);

  const [userSnap, productSnap] = await Promise.all([get(userRef), get(productRef)]);

  const userData = userSnap.val();
  const productData = productSnap.val();

  if (!productData) return alert("Product not found.");
  if (userData.products?.[productId]) return alert("Already owned.");
  if (userData.credits < productData.price) return alert("Not enough credits.");

  await update(userRef, {
    credits: userData.credits - productData.price,
    [`products/${productId}`]: true
  });

  alert(`You bought ${productData.name}.`);
};

loadProducts();
