import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDXjyQMzWGLszCp5_n8hccTs_j1wvZP0LU",
  authDomain: "mi-primer-firebase-63851.firebaseapp.com",
  projectId: "mi-primer-firebase-63851",
  storageBucket: "mi-primer-firebase-63851.firebasestorage.app",
  messagingSenderId: "950843094527",
  appId: "1:950843094527:web:3d7b55d506707e81f463ca"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();