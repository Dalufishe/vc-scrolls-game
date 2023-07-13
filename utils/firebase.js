import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBIzQkKMsK6H5T_vV-hm4-WdQn0qt2cezA",
  authDomain: "vc-scrolls-game-firebase.firebaseapp.com",
  projectId: "vc-scrolls-game-firebase",
  storageBucket: "vc-scrolls-game-firebase.appspot.com",
  messagingSenderId: "570370331226",
  appId: "1:570370331226:web:a207b3b96714d7486b7e63",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
