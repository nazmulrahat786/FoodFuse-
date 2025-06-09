
import { initializeApp } from "firebase/app";


import { getAuth } from "firebase/auth";

const firebaseConfig = {
 apiKey: "AIzaSyCkkth-Mc0zbCpKrQk5DL-rGzkb0qoSCz4",
  authDomain: "foodfuse-1b815.firebaseapp.com",
  projectId: "foodfuse-1b815",
  storageBucket: "foodfuse-1b815.firebasestorage.app",
  messagingSenderId: "489098807701",
  appId: "1:489098807701:web:2830d684fdd3c250930e9c",
  measurementId: "G-LKTF3HQ2ZY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;