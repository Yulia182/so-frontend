// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJkZ4p1QzuQhANFSqFe5SZ1u6pBjccRx8",
  authDomain: "shout-outs-f9375.firebaseapp.com",
  projectId: "shout-outs-f9375",
  storageBucket: "shout-outs-f9375.appspot.com",
  messagingSenderId: "528125537466",
  appId: "1:528125537466:web:c9a39c3293377394016683",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

export function sighInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}

export function signOutWithGoogle(): void {
  auth.signOut();
}

export const storage = getStorage(app);
