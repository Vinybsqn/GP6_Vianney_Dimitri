// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWbvcqrKYJcymzXD1MjeyL7jabbJ6fwfs",
    authDomain: "echecmatch-ae7c7.firebaseapp.com",
    projectId: "echecmatch-ae7c7",
    storageBucket: "echecmatch-ae7c7.appspot.com",
    messagingSenderId: "300684718853",
    appId: "1:300684718853:web:3570b481256dd391c67d6c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;