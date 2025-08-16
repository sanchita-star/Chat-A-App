// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5UKXf46KSzwx83u49YvONUvK--HE9frw",
  authDomain: "chatapp-bef9b.firebaseapp.com",
  projectId: "chatapp-bef9b",
  storageBucket: "chatapp-bef9b.firebasestorage.app",
  messagingSenderId: "936208438337",
  appId: "1:936208438337:web:98a2b7a2a87e32473ce2c0",
  measurementId: "G-M55F9XZ7X5"
};

const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
export const db = getFirestore(app);