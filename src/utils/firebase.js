
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyD_7V8KjxgWoD6t7modRIPXbcpXfA5y-YA",
    authDomain: "tenedores-v1-c302a.firebaseapp.com",
    projectId: "tenedores-v1-c302a",
    storageBucket: "tenedores-v1-c302a.appspot.com",
    messagingSenderId: "33628664022",
    appId: "1:33628664022:web:f744b6fba530b5935d9977"
};


export const initFirebase = initializeApp(firebaseConfig);