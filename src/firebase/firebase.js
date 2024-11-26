
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Importação necessária

const firebaseConfig = {
  apiKey: "AIzaSyBtIClS91NTN7c2s5BFs7Hmtu6VO_n7iX4",
  authDomain: "coral-guard.firebaseapp.com",
  projectId: "coral-guard",
  storageBucket: "coral-guard.appspot.com",
  messagingSenderId: "527306576350",
  appId: "1:527306576350:web:536023b5ce97d8cbb24d4f",
  measurementId: "G-NHTGMMN6JF"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicialize o Storage
const storage = getStorage(app);

// Exportações
export const auth = getAuth();
export const db = getFirestore();
export { storage };
