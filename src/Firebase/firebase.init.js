
import { initializeApp } from "firebase/app";


import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAdaFQg09GxFG-NGgH7ZdjDS32k_paTBmY",
  authDomain: "food786-53dd9.firebaseapp.com",
  projectId: "food786-53dd9",
  storageBucket: "food786-53dd9.firebasestorage.app",
  messagingSenderId: "639426129567",
  appId: "1:639426129567:web:73630a7ca59807e528bcaa"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;