// Import the functions you need from the Firebase SDKs you want to use.
import { initializeApp } from 'firebase/app';
import { getAnalytics, type Analytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBe7uThxjKtP0A9QgK9KMu59bAUB4GXj4g',
  authDomain: 'portfolio-danilo-novais.firebaseapp.com',
  databaseURL: 'https://portfolio-danilo-novais-default-rtdb.firebaseio.com',
  projectId: 'portfolio-danilo-novais',
  storageBucket: 'portfolio-danilo-novais.firebasestorage.app',
  messagingSenderId: '350817205989',
  appId: '1:350817205989:web:f7ae32f12d353ef081de0c',
  measurementId: 'G-PM34VYPZZW',
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);

let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { firebaseConfig, app, analytics };
