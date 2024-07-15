// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgMJidWe4jb7ZoLMDoGML0-sDC6GZOsRY",
  authDomain: "fir-react-00.firebaseapp.com",
  projectId: "fir-react-00",
  storageBucket: "fir-react-00.appspot.com",
  messagingSenderId: "810577453721",
  appId: "1:810577453721:web:0f8181d23571e4b2d58e08",
  measurementId: "G-W3M1T9LQ6X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage };