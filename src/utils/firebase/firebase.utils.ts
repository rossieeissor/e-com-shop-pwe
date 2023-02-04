import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  getDocs,
  QueryDocumentSnapshot,
  // writeBatch,
} from "firebase/firestore";
// import { SHOP_DATA } from "../../shop-data";

import { Category } from "../../store/categories/categories.types";
import { CartItem } from "../../store/cart/cart.types";

const firebaseConfig = {
  apiKey: "AIzaSyCDfhYmbG_qjMSUn_vHlX09n7RcsUz6Bo8",
  authDomain: "clothing-db-e06fb.firebaseapp.com",
  projectId: "clothing-db-e06fb",
  storageBucket: "clothing-db-e06fb.appspot.com",
  messagingSenderId: "1081277642227",
  appId: "1:1081277642227:web:cace823ee9a62c4e7e4e86",
};

initializeApp(firebaseConfig);
// console.log("this is firebaseApp", firebaseApp);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const createNewUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInWithUserEmailandPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const clothingDB = getFirestore();

export type AdditionlInfo = {
  displayName?: string;
};

export type UserData = {
  createdAt: string;
  displayName: string;
  email: string;
};

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInfo = {} as AdditionlInfo
): Promise<QueryDocumentSnapshot<UserData> | void> => {
  if (!userAuth) return;
  const userDocRef = doc(clothingDB, "users", userAuth.uid);
  let userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    try {
      const { displayName, email } = userAuth;
      const date = new Date();
      const createdAt = JSON.stringify(date.toJSON());
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
        cart: [],
      });
      userSnapshot = await getDoc(userDocRef);
    } catch (err) {
      console.log("error creating user", err);
    }
  }
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const getCategoriesAndDocuments = async (
  collectionString: string
): Promise<Category[]> => {
  const collectionRef = collection(clothingDB, collectionString);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoriesArray = querySnapshot.docs.map(
    docSnapshot => docSnapshot.data() as Category
  );
  return categoriesArray;
};

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      userAuth => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};

export const addCartItemsToFirestore = async (
  cartItems: CartItem[],
  userAuth: User
) => {
  const cartDocRef = doc(clothingDB, "users", userAuth.uid);
  await updateDoc(cartDocRef, { cart: cartItems });
};

export const getCartItemsFromFirestore = async (userAuth: User) => {
  const cartDocRef = doc(clothingDB, "users", userAuth.uid);
  const cartSnapshot = await getDoc(cartDocRef);
  const cartItems = cartSnapshot.get("cart");
  return cartItems;
};

// const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
//   const collectionRef = collection(clothingDB, collectionKey);
//   const batch = writeBatch(clothingDB);

//   objectToAdd.forEach(object => {
//     const docRef = doc(collectionRef, object.title.toLowerCase());
//     batch.set(docRef, object);
//   });
//   await batch.commit();
//   console.log("done");
// };
// // addCollectionAndDocuments("categories", SHOP_DATA);
