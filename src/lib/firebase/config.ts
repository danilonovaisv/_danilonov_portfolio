import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBe7uThxjKtP0A9QgK9KMu59bAUB4GXj4g',
  authDomain: 'portfolio-danilo-novais.firebaseapp.com',
  databaseURL: 'https://portfolio-danilo-novais-default-rtdb.firebaseio.com',
  projectId: 'portfolio-danilo-novais',
  storageBucket: 'portfolio-danilo-novais.firebasestorage.app',
  messagingSenderId: '350817205989',
  appId: '1:350817205989:web:6329ec75abd0747481de0c',
  measurementId: 'G-JV88VCE2CF',
};

// Initialize Firebase
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Analytics only on client side and if supported
let analytics;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };
