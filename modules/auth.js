// modules/auth.js
import { auth, db } from "../firebase/config.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

document.getElementById("loginBtn").addEventListener("click", login);
document.getElementById("registerBtn").addEventListener("click", register);

function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, pass)
    .then(() => window.location.href = "shop.html")
    .catch(err => alert(err.message));
}

function register() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, pass)
    .then(cred => {
      const emailKey = email.replace(/\./g, '_').replace(/@/g, '_at_');
      return set(ref(db, `users/${emailKey}`), {
        credits: 100,
        products: {},
        isAdmin: false
      });
    })
    .then(() => window.location.href = "shop.html")
    .catch(err => alert(err.message));
}
