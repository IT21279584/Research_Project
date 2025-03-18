import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDA59vkiCS_a26V11rwtdLFEKRXOgwwE4U",
  authDomain: "cultivation-monitor.firebaseapp.com",
  databaseURL: "https://cultivation-monitor-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cultivation-monitor",
  storageBucket: "cultivation-monitor.firebasestorage.app",
  messagingSenderId: "757470145120",
  appId: "1:757470145120:web:d6213e59082b7e823b7105"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);