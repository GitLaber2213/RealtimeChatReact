import { getAuth } from 'firebase/auth'
import firebase from 'firebase/compat/app'
import { getFirestore } from "firebase/firestore"



const firebaseConfig = {
    apiKey: "AIzaSyADYOb9L3f4x5druPD9Z0nsDOXqI0rC5Ss",
    authDomain: "real-time-shat.firebaseapp.com",
    projectId: "real-time-shat",
    storageBucket: "real-time-shat.firebasestorage.app",
    messagingSenderId: "354073183953",
    appId: "1:354073183953:web:321fb3c6f0d87e932a67f0",
    measurementId: "G-C8J5N5JBVX"
}


const app = firebase.initializeApp(firebaseConfig)
const auth = getAuth(app)
const firestoreDB = getFirestore(app)

export {app, auth, firestoreDB }
