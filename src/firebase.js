import firebase from 'firebase'
require('firebase/auth')
 

const firebaseConfig = {
    apiKey: "AIzaSyAfp2A3njUjnI0wQudtBi0GjC4U2Xx5k-4",
    authDomain: "clinicaptomontt-ef00b.firebaseapp.com",
    projectId: "clinicaptomontt-ef00b",
    storageBucket: "clinicaptomontt-ef00b.appspot.com",
    messagingSenderId: "864261251699",
    appId: "1:864261251699:web:ab2378db2c830a31880006"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  // export
export const auth = firebase.auth();