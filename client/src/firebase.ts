import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4Kvo8qgZyNcitEKFAMj-0Bk-akjT7ezw",
  authDomain: "iot-smarthydroponic.firebaseapp.com",
  databaseURL:
    "https://iot-smarthydroponic-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iot-smarthydroponic",
  storageBucket: "iot-smarthydroponic.firebasestorage.app",
  messagingSenderId: "962996510827",
  appId: "1:962996510827:web:42262106b95e672d7e112e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
