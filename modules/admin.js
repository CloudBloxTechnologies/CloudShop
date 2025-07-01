import { db, auth } from "../firebase/config.js";
import { ref, get, set, remove } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

function keyToEmail(key) {
  return key.replace(/_at_/g, '@').replace(/_/g, '.');
}

const userListDiv = document.getElementById("userList");

onAuthStateChanged(auth, async (user) => {
  if (!user || user.email !== "admin@example.com") {
    window.location.href = "index.html";
    return;
  }

  const snap = await get(ref(db, "users"));
  const users = snap.val();
  userListDiv.innerHTML = "";

  for (let key in users) {
    const u = users[key];
    const email = keyToEmail(key);

    const el = document.createElement("div");
    el.className = "admin-user-card";
    el.innerHTML = `
      <h3>${email}</h3>
      <p>Credits: <span id="credits-${key}">${u.credits}</span></p>
      <input id="newCredits-${key}" type="number" placeholder="New Credits">
      <button onclick="window.updateCredits('${key}')">Update</button>
      <ul>
        ${u.products ? Object.keys(u.products).map(pid => `
          <li>${pid} <button onclick="window.removeProduct('${key}', '${pid}')">X</button></li>
        `).join("") : "<li>None</li>"}
      </ul>
      <input id="addProduct-${key}" type="text" placeholder="Add product ID">
      <button onclick="window.addProduct('${key}')">Add</button>
    `;
    userListDiv.appendChild(el);
  }
});

window.updateCredits = async function (key) {
  const newCredits = parseInt(document.getElementById(`newCredits-${key}`).value);
  if (isNaN(newCredits)) return alert("Invalid input");
  await set(ref(db, `users/${key}/credits`), newCredits);
  document.getElementById(`credits-${key}`).innerText = newCredits;
};

window.addProduct = async function (key) {
  const pid = document.getElementById(`addProduct-${key}`).value.trim();
  if (!pid) return;
  await set(ref(db, `users/${key}/products/${pid}`), true);
  location.reload();
};

window.removeProduct = async function (key, pid) {
  await remove(ref(db, `users/${key}/products/${pid}`));
  location.reload();
};
