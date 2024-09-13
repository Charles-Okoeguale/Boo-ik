import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDU_r22iRvmCiDbp7MPHEOb_-xWLrsBHKY",
  authDomain: "boo-ik.firebaseapp.com",
  projectId: "boo-ik",
  storageBucket: "boo-ik.appspot.com",
  messagingSenderId: "207178569337",
  appId: "1:207178569337:web:2b2f745cb6e832a604a6a8",
  measurementId: "G-RBEW0G3ZRC"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app); 
export const provider = new GoogleAuthProvider();

setPersistence(auth, browserLocalPersistence)
.catch((error) => {
  console.error("Error setting persistence:", error);
});
