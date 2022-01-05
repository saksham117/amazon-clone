import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore(); // realtime database of firebase
const auth = firebase.auth();   // authentication module of firebase

export { db, auth};
