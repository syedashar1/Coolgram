import firebase from 'firebase/app'
import 'firebase/storage';
import 'firebase/firestore';



// Your web app's Firebase configuration
var firebaseConfig = {
        apiKey: "AIzaSyA8jx1i-eDAh6x_mUz5dArwTjQ-a0Wh4UA",
        authDomain: "fire-gram-ed7e3.firebaseapp.com",
        projectId: "fire-gram-ed7e3",
        storageBucket: "fire-gram-ed7e3.appspot.com",
        messagingSenderId: "226747187846",
        appId: "1:226747187846:web:969408cebd3df140f38707"
      };
      // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
// const fireDb = firebase.initializeApp(firebaseConfig);

export { projectStorage, projectFirestore, timestamp };