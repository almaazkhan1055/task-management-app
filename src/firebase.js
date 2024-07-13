import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCODk9dhhsifEfWRXIg146JYllujePu1cI",
  authDomain: "task-management-app-6e356.firebaseapp.com",
  projectId: "task-management-app-6e356",
  storageBucket: "task-management-app-6e356.appspot.com",
  messagingSenderId: "806586087871",
  appId: "1:806586087871:web:ec48f1d61fd997daaf490a",
  measurementId: "G-TWJQ9WPNXJ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
