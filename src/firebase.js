// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAAU35WMsgUNGMCN4YaU7afRxpDKeEM6YQ",
    authDomain: "manejo-multisesiones.firebaseapp.com",
    projectId: "manejo-multisesiones",
    storageBucket: "manejo-multisesiones.appspot.com",
    messagingSenderId: "545813926746",
    appId: "1:545813926746:web:494b71c384559c8a539963"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };