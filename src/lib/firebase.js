// src/lib/firebase.js or firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCJwMPHCUHgiR0LecSv94yAy9R17ZgNUVc",
  authDomain: "profile-blogs-86b91.firebaseapp.com",
  projectId: "profile-blogs-86b91",
  storageBucket: "profile-blogs-86b91.firebasestorage.app",
  messagingSenderId: "6690533759",
  appId: "1:6690533759:web:a985adbc2e212824102a4a",
  measurementId: "G-N8TCGK9925"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)