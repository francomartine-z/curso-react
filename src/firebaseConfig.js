import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBRig8LTFlj_S8cdTqnn-2ykLPhtElVCnk",
  authDomain: "curso-react-project.firebaseapp.com",
  projectId: "curso-react-project",
  storageBucket: "curso-react-project.firebasestorage.app",
  messagingSenderId: "645768540968",
  appId: "1:645768540968:web:ac2405477577548bdb161d"
};


export const app = initializeApp(firebaseConfig);