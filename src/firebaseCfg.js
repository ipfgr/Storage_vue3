//Firebase config and export
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'
import 'firebase/analytics'

const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: "storage-vue3.firebaseapp.com",
    projectId: "storage-vue3",
    storageBucket: "storage-vue3.appspot.com",
    messagingSenderId: "484356892852",
    appId: "1:484356892852:web:9d855e4d4e5238efbb8fe1",
    measurementId: "G-MK0S7GJQ3V"
};


firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const auth = firebase.auth()

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// collections
const productsCollection = db.collection("products")
const itemNamesCollection = db.collection("item-names")
const usersCollection = db.collection('users')

export {
    db,
    auth,
    productsCollection,
    itemNamesCollection,
    usersCollection,
}