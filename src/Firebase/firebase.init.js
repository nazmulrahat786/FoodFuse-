
import { initializeApp } from "firebase/app";


import { getAuth } from "firebase/auth";
const firebaseConfig = {
 apiKey: "AIzaSyBiffTWeL366gp-byro87vThWyg1PCNKO8",
  authDomain: "fbfsf-a4a9f.firebaseapp.com",
  databaseURL: "https://fbfsf-a4a9f-default-rtdb.firebaseio.com",
  projectId: "fbfsf-a4a9f",
  storageBucket: "fbfsf-a4a9f.firebasestorage.app",
  messagingSenderId: "829280606347",
  appId: "1:829280606347:web:07126bdeafe0c073b3dc8e",
  measurementId: "G-P32T5PTGTF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;