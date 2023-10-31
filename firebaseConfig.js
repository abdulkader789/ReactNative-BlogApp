import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBv-8y5srQJE3XlIhCk-qjgpOLc63kFCUo",
    authDomain: "blogapp-3e567.firebaseapp.com",
    projectId: "blogapp-3e567",
    storageBucket: "blogapp-3e567.appspot.com",
    messagingSenderId: "377936314206",
    appId: "1:377936314206:web:4765c003b7b0b8ed8519cf",
    measurementId: "G-JRDNJL6P89"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});
const firestore = getFirestore(app);
const storage = getStorage(app);

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
export { firebase, auth, firestore, storage, app, ref };
