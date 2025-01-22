import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";
import firebase from 'firebase/compat/app';
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyCTrMIMYXOdtHGbtNi727TabUmFGdlIYsk",
    authDomain: "real-time-chat-41c7f.firebaseapp.com",
    databaseURL: "https://real-time-chat-41c7f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "real-time-chat-41c7f",
    storageBucket: "real-time-chat-41c7f.firebasestorage.app",
    messagingSenderId: "443825379882",
    appId: "1:443825379882:web:1fe9bb09ca13247382c153",
    measurementId: "G-XDPKGJ7MF8"
}


const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestoreDB = getFirestore(app);

export {app, auth, firestoreDB}
