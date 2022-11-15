import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDfhYmbG_qjMSUn_vHlX09n7RcsUz6Bo8",
  authDomain: "clothing-db-e06fb.firebaseapp.com",
  projectId: "clothing-db-e06fb",
  storageBucket: "clothing-db-e06fb.appspot.com",
  messagingSenderId: "1081277642227",
  appId: "1:1081277642227:web:cace823ee9a62c4e7e4e86",
};

const firebaseApp = initializeApp(firebaseConfig);
// console.log("this is firebaseApp", firebaseApp);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
// console.log("this is auth from getAuth", auth);

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const clothingDB = getFirestore();
// console.log("this is clothingDB", clothingDB);

export const createUserDocumentFromAuth = async userAuth => {
  const userDocRef = doc(clothingDB, "users", userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    try {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (err) {
      console.log("error creating user", err);
    }
  }
  return userDocRef;
};

// export const testFunc = async userAuth => {
//   const testRef = doc(clothingDB, "tests-coll", "test-doc");
//   console.log(testRef);
//   const testSnapshot = await getDoc(testRef);
//   console.log(testSnapshot);
//   console.log(testSnapshot.exists());
// };
