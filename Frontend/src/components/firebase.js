// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAVe7iV809Dr6mpOJw3Ya-fPDIAkrl5ZVI",
    authDomain: "fooddost-c7ab2.firebaseapp.com",
    projectId: "fooddost-c7ab2",
    storageBucket: "fooddost-c7ab2.appspot.com",
    messagingSenderId: "30566213488",
    appId: "1:30566213488:web:6048b09ef0bf2b1ed951b5",
    measurementId: "G-0R9VMF9V8Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
const analytics = getAnalytics(app);
export { analytics };