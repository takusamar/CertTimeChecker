import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from './firebaseConfig';

export const app = firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
