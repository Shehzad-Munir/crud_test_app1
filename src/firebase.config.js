// Import the functions you need from the SDKs you need
import { initializeApp,getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAtennbEcxQvpBl79luWlF1hmPVfI8Pji8",
  authDomain: "resturantapp-9729b.firebaseapp.com",
  databaseURL: "https://resturantapp-9729b-default-rtdb.firebaseio.com",
  projectId: "resturantapp-9729b",
  storageBucket: "resturantapp-9729b.appspot.com",
  messagingSenderId: "856892756121",
  appId: "1:856892756121:web:d4338a3f913e07367c2808",
  measurementId: "G-6QRMS4VSMZ"
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp():initializeApp(firebaseConfig);
const firestore = getFirestore(app)
const storage  = getStorage(app)
const analytics = getAnalytics(app);

export {app, firestore, storage}
