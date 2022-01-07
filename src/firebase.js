import  firebase  from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const apiKey = process.env.REACT_APP_apiKey
const authDomain = process.env.REACT_APP_authDomain
const projectId = process.env.REACT_APP_projectId
const storageBucket = process.env.REACT_APP_storageBucketS
const messagingSenderId = process.env.REACT_APP_messagingSenderId
const appId = process.env.REACT_APP_appId



const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.app().storage('pokeapp-b1252.appspot.com')
export {auth, firebase, db, storage}
