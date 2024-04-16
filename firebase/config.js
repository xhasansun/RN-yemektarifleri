// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8bFcAV6NQAOtlI6z6Zw1F3-rtEqKW_xo",
    authDomain: "yemek-tarifleri-7671a.firebaseapp.com",
    projectId: "yemek-tarifleri-7671a",
    storageBucket: "yemek-tarifleri-7671a.appspot.com",
    messagingSenderId: "1072223586741",
    appId: "1:1072223586741:web:9cc11da847ff03a6adf1fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth};