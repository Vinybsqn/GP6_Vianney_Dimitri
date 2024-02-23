// firebase-config.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAWbvcqrKYJcymzXD1MjeyL7jabbJ6fwfs",
    authDomain: "echecmatch-ae7c7.firebaseapp.com",
    databaseURL: "https://echecmatch-ae7c7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "echecmatch-ae7c7",
    storageBucket: "echecmatch-ae7c7.appspot.com",
    messagingSenderId: "300684718853",
    appId: "1:300684718853:web:3570b481256dd391c67d6c"
};

const app = initializeApp(firebaseConfig);

export default app;
