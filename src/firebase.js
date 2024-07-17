// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAtmGXyCrg8vGzYYmz-xPWvtMQwbgIckJU",
    authDomain: "multi-69d78.firebaseapp.com",
    projectId: "multi-69d78",
    storageBucket: "multi-69d78.appspot.com",
    messagingSenderId: "972033288889",
    appId: "1:972033288889:web:ce1bd13f1b8670539cc968",
    measurementId: "G-NYN5W71JNW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };