import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getReactNativePersistence, initializeAuth } from 'firebase/auth'; 
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBwXYKLCR0U_BKkoeE6LwDwypl7_WtBZW4",
  authDomain: "managercentral-a07a3.firebaseapp.com",
  projectId: "managercentral-a07a3",
  storageBucket: "managercentral-a07a3.appspot.com",
  messagingSenderId: "539303833943",
  appId: "1:539303833943:android:2f9f85677e6b28e1340e12",
  measurementId: "G-YW5M7MNS73"
};


const app = initializeApp(firebaseConfig);


const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage) 
});


const firestore = getFirestore(app);
const storage = getStorage(app);


export {
  auth,
  firestore,
  storage,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setDoc,  
  doc,
  getDoc  
};
