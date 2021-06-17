import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "",
    authDomain: "clone-2dafa.firebaseapp.com",
    projectId: "clone-2dafa",
    storageBucket: "clone-2dafa.appspot.com",
    messagingSenderId: "",
    appId: "f",
    measurementId: "G-5N0NHY7EEE"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore(); // realtime database of firebase
const auth = firebase.auth();   // authentication module of firebase

export { db, auth};
