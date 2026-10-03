// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAn1G7JPZJNMgtzL1EbjYPW-bf_9kAyYlQ",
  authDomain: "calculadora-dosi-de-radiacio.firebaseapp.com",
  databaseURL: "https://calculadora-dosi-de-radiacio-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "calculadora-dosi-de-radiacio",
  storageBucket: "calculadora-dosi-de-radiacio.appspot.com",
  messagingSenderId: "535811533140",
  appId: "1:535811533140:web:8dc0766d89ed4de26680c1",
  measurementId: "G-G3BV0LKL33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

export { database };