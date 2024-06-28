import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyBwMzsYlXph6j2sii14FMlE_Lu6NeYhZ-E",
	authDomain: "ugsd-11db4.firebaseapp.com",
	databaseURL: "https://ugsd-11db4-default-rtdb.firebaseio.com",
	projectId: "ugsd-11db4",
	storageBucket: "ugsd-11db4.appspot.com",
	messagingSenderId: "59538423859",
	appId: "1:59538423859:web:6fa0c581343fc1d00b6346",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage();

export default app;
