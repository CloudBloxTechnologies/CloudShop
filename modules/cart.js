// modules/cart.js
import { auth } from "../firebase/config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("cartItems").innerText = "Cart feature coming soon!";
});
