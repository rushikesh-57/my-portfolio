// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// Your Firebase config (replace with your own from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyAEIRFdK9LyKZ7zGxrGoeSnMACsrD4e8-c",
  authDomain: "myportfolio-4c223.firebaseapp.com",
  projectId: "myportfolio-4c223",
  storageBucket: "myportfolio-4c223.firebasestorage.app",
  messagingSenderId: "831289165392",
  appId: "1:831289165392:web:7c514cdaa79bd997c83355"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };




// const firebaseConfig = {
//   apiKey: "",
//   authDomain: "",
//   projectId: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: "",
//   measurementId: "G-DMCR7JEFWN"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);