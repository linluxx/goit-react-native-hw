// import { initializeApp } from "firebase/app";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXdZ3Vqn5QxHyYxOst1ZIukjnB3dOlWes",
  authDomain: "sns-on-react-native.firebaseapp.com",
  projectId: "sns-on-react-native",
  storageBucket: "sns-on-react-native.appspot.com",
  messagingSenderId: "296921438677",
  appId: "1:296921438677:web:37a0aee119a5599940855c",
  measurementId: "G-SPRPYCPTE1",
};

// const firebaseApp = initializeApp(firebaseConfig);

// export default firebaseApp;
export default firebase.initializeApp(firebaseConfig);
