import firebase from 'firebase';
require('@firebase/firestore')

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAsgD1D_fc1UMPoYtzGAV4SRe1yE9mWiCM",
    authDomain: "debugging-9a4f0.firebaseapp.com",
    databaseURL: "https://debugging-9a4f0.firebaseio.com",
    projectId: "debugging-9a4f0",
    storageBucket: "debugging-9a4f0.appspot.com",
    messagingSenderId: "191872812414",
    appId: "1:191872812414:web:8ae613de10cf24900b5f2f",
    measurementId: "G-XD3DCQTM29"
  };

  //initialise firebase 
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()