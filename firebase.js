import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyA2HkSuiKp2pVOft1Tm7XzhiMGl6oh1RMo',
  authDomain: 'instagram-8b36c.firebaseapp.com',
  projectId: 'instagram-8b36c',
  storageBucket: 'instagram-8b36c.appspot.com',
  messagingSenderId: '158967317702',
  appId: '1:158967317702:web:ff665ac0970c6d344d43c7',
}

// Initialize Firebase using Singleton pattern
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// FireStore Database
const db = getFirestore()

//Firebase Storage
const storage = getStorage()

//Login with google

export { app, db, storage }
