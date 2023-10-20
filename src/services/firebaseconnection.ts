
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyAwtShNfXR69HE-Lt-JtKeMzWAR0n4NezI",
  authDomain: "webcarros2.firebaseapp.com",
  projectId: "webcarros2",
  storageBucket: "webcarros2.appspot.com",
  messagingSenderId: "1098487403183",
  appId: "1:1098487403183:web:49ab8182acd2eac467fa5a"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const storage = getStorage(app);

export { db, auth, storage};