import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCe7Z49vejntOaoJej9kRovN7pc5ExCv_o",
  authDomain: "odincodin-trinit.firebaseapp.com",
  projectId: "odincodin-trinit",
  storageBucket: "odincodin-trinit.appspot.com",
  messagingSenderId: "602272564915",
  appId: "1:602272564915:web:af632a33f659823ae0d2c6",
  measurementId: "G-ZSWM8RZZYR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
