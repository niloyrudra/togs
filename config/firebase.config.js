import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Constants from 'expo-constants';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAKl5Zx08NfUZDzSs3gUpBCkgKvSHrQQOA",
  authDomain: "togs-abcca.firebaseapp.com",
  projectId: "togs-abcca",
  storageBucket: "togs-abcca.appspot.com",
  messagingSenderId: "916182235281",
  appId: "1:916182235281:web:64b691eba20439cd3fa730"
};
  
// const firebaseConfig = {
//     apiKey: Constants.manifest.extra.apiKey,
//     authDomain: Constants.manifest.extra.authDomain,
//     databaseURL: Constants.manifest.extra.databaseURL,
//     projectId: Constants.manifest.extra.projectId,
//     storageBucket: Constants.manifest.extra.storageBucket,
//     messagingSenderId: Constants.manifest.extra.messagingSenderId,
//     appId: Constants.manifest.extra.appId,
//     measurementId: Constants.manifest.extra.measurementId
// };


let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

// const app
const db = app.firestore();
const auth = firebase.auth();

export { db, auth, app, firebase };