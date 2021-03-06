import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB1pcDlnzFvYSxuHnacQ4j9ABsLy-KzEGc",
  authDomain: "emdb-247ae.firebaseapp.com",
  projectId: "emdb-247ae",
  storageBucket: "emdb-247ae.appspot.com",
  messagingSenderId: "582780861585",
  appId: "1:582780861585:web:269eee0a054944554e5330",
  measurementId: "G-Z0T6D97RYM",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.fireStore();
const auth = firebase.auth();

export { auth };
export default db;
