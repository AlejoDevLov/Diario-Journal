// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBHNEVkj557pjZiXCgH1jtR5PKNyyjPBIg",
    authDomain: "curso-react-8e028.firebaseapp.com",
    projectId: "curso-react-8e028",
    storageBucket: "curso-react-8e028.appspot.com",
    messagingSenderId: "560650018100",
    appId: "1:560650018100:web:5e6aeafb297c0219721961"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth( firebaseApp );

export const firebaseDB = getFirestore( firebaseApp );