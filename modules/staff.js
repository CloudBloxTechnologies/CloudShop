import { db } from "../firebase/config.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

const staffRef = ref(db, "staff");
const container = document.getElementById("staffList");

onValue(staffRef, (snapshot) => {
  const staff = snapshot.val();
  container.innerHTML = "";

  for (const id in staff) {
    const member = staff[id];
    const card = document.createElement("div");
    card.className = "staff-card";
    card.innerHTML = `
      <img src="${member.image}" alt="staff photo">
      <h4>${member.name}</h4>
      <p>${member.rank}</p>
    `;
    container.appendChild(card);
  }
});
