import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyCabQ7UMR7KkoLK8prihjDkTC6eXyx7NKE",
  authDomain: "skjaldborg-9c060.firebaseapp.com",
  databaseURL: "https://skjaldborg-9c060.firebaseio.com",
  projectId: "skjaldborg-9c060",
  storageBucket: "skjaldborg-9c060.appspot.com",
  messagingSenderId: "1006282516525",
  appId: "1:1006282516525:web:99b52080b0c0b5f98a70a4",
  measurementId: "G-K3CLNEGZ4W"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const db = firebase.firestore();

export const storage = firebase.storage();
