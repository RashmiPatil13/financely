// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqDuHBtzpTUz15pszYHZHnfW8d5lsPBC8",
  authDomain: "financely-c4f84.firebaseapp.com",
  projectId: "financely-c4f84",
  storageBucket: "financely-c4f84.appspot.com",
  messagingSenderId: "628987313883",
  appId: "1:628987313883:web:a994affaa4eebc539c56fe",
  measurementId: "G-8H86PS4CCV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db, auth, provider, doc, setDoc };