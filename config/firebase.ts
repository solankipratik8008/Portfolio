import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '',
};

let app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;

function isConfigValid(): boolean {
  return !!(firebaseConfig.apiKey && firebaseConfig.projectId);
}

function getApp(): FirebaseApp | null {
  if (!app && isConfigValid() && Platform.OS === 'web' && typeof window !== 'undefined') {
    app = initializeApp(firebaseConfig);
  }
  return app;
}

export function getFirebaseAuth(): Auth | null {
  if (!_auth) {
    const firebaseApp = getApp();
    if (firebaseApp) {
      _auth = getAuth(firebaseApp);
    }
  }
  return _auth;
}

export function getFirebaseDb(): Firestore | null {
  if (!_db) {
    const firebaseApp = getApp();
    if (firebaseApp) {
      _db = getFirestore(firebaseApp);
    }
  }
  return _db;
}
