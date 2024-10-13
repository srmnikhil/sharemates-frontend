import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// import { initializeApp, getApp, getApps } from 'firebase/app';
// import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
    apiKey: "AIzaSyA984x6c1JOEqX1Lg2jmDO-1y-Y0AIEwGE",
    authDomain: "location-sharing-cbed6.firebaseapp.com",
    projectId: "location-sharing-cbed6",
    storageBucket: "location-sharing-cbed6.appspot.com",
    messagingSenderId: "90995954129",
    appId: "1:90995954129:web:a196d79b599f365bf890f0"
};

// Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}
// const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
// const auth = getAuth(app);

// export { auth };
