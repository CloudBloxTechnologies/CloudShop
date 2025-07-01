// firebase/config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAd6zWZVz0PLgfgumOOA95tqqIfaKR4mLE",
  authDomain: "cloudstore-8fb08.firebaseapp.com",
  databaseURL: "https://cloudstore-8fb08-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cloudstore-8fb08",
  storageBucket: "cloudstore-8fb08.firebasestorage.app",
  messagingSenderId: "654073139942",
  appId: "1:654073139942:web:064d7e27502a307aa56127"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
