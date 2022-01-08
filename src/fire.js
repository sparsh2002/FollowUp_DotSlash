import firebase from 'firebase'
import "firebase/firestore";
// import { initializeApp } from "firebase/app";
// import * as firebase from 'firebase';
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDh1ml-35n4lhYm6EK6b-Q6ytjjLJk85pA",
    authDomain: "devfolio-2b72e.firebaseapp.com",
    projectId: "devfolio-2b72e",
    storageBucket: "devfolio-2b72e.appspot.com",
    messagingSenderId: "994393862072",
    appId: "1:994393862072:web:5a4e627be2d8232a33694d"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

export default fire;  