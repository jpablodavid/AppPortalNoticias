import { firebase } from "@firebase/app";
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyCHCH4r_cJmkpwMztcCywymVE_l0bfEDrs",
	authDomain: "portanoticias-c2b8f.firebaseapp.com",
	projectId: "portanoticias-c2b8f",
	storageBucket: "portanoticias-c2b8f.appspot.com",
	messagingSenderId: "694117033532",
	appId: "1:694117033532:web:412327651728b547924539",
});


const db = firebase.firestore();


export { db };