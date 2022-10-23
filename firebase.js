// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, Firestore, getDoc, getFirestore } from "firebase/firestore";
import { Platform } from "react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYBJODVkKES_rQ835CcFrPbW5BnyOPVQg",
  authDomain: "cityportal-84540.firebaseapp.com",
  databaseURL: "https://cityportal-84540-default-rtdb.firebaseio.com",
  projectId: "cityportal-84540",
  storageBucket: "cityportal-84540.appspot.com",
  messagingSenderId: "377506316128",
  appId: "1:377506316128:web:773e26c2fc0c3e27fca805",
  measurementId: "G-Z6HRLHP4LQ",
};
// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

const firestore = firebase.firestore();

export { auth };
export { firestore };

export const createUserDocument = async (user, uid) => {
  if (!user) return;

  const userRef = firestore.collection("users").doc(uid);

  const snap = await userRef.get();

  if (!snap.exists) {
    try {
      userRef.set(user);
    } catch (error) {
      console.log("Error creating user", error);
    }
  }
};

export const getUserNameByID = async (userId) => {
  var username = "";

  const userRef = firestore.collection("users").doc(userId);

  const snap = await userRef.get();

  if (snap.exists) {
    try {
      username = snap.get("name");
      return username;
    } catch (error) {
      console.log("Error reading user", error);
    }
  }
};

export const createCarDocument = async (car) => {
  if (!car) return;

  const carRef = firestore.collection("cars").doc();

  try {
    carRef.set(car, {
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    return carRef.id;
  } catch (error) {
    console.log("Error creating car", error);
  }
};

export const readCarDocuments = async () => {
  var carList = [];

  const snapshot = await firestore.collection("cars").get();

  snapshot.forEach((document) => {
    carList.push({ id: document.id, ...document.data() });
  });

  return carList;
};

export const updateCarDocument = async (carId, car) => {
  if (!car) return;

  const carRef = firestore.collection("cars").doc(carId);

  try {
    carRef.update(car);
  } catch (error) {
    console.log("Error updating car", error);
  }
};

export const deleteCarDocument = async (carId) => {
  const carRef = firestore.collection("cars").doc(carId);

  try {
    carRef.delete();
  } catch (error) {
    console.log("Error deleting car", error);
  }
};

export const getCarSingleDocument = async (carId) => {
  const carRef = firestore.collection("cars").doc(carId);

  const snap = await carRef.get();

  if (snap.exists) {
    try {
      return snap;
    } catch (error) {
      console.log("Error reading car", error);
    }
  }
};

export const getCarNameByID = async (carId) => {
  var carName = "";

  const carRef = firestore.collection("cars").doc(carId);

  const snap = await carRef.get();

  if (snap.exists) {
    try {
      carName = snap.get("carName");
      return carName;
    } catch (error) {
      console.log("Error reading car", error);
    }
  }
};

export const getCarImageByID = async (carId) => {
  var carImage = "";

  const carRef = firestore.collection("cars").doc(carId);

  const snap = await carRef.get();

  if (snap.exists) {
    try {
      carImage = snap.get("image");
      return carImage;
    } catch (error) {
      console.log("Error reading car", error);
    }
  }
};

export const createBookingDocument = async (booking) => {
  if (!booking) return;

  const bookingRef = firestore.collection("bookings").doc();

  try {
    bookingRef.set(booking, {
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.log("Error booking car", error);
  }
};

export const readBookingDocuments = async (uid) => {
  var bookingList = [];

  const snapshot = await firestore
    .collection("bookings")
    .where("userID", "==", uid)
    .get();

  snapshot.forEach((document) => {
    bookingList.push({ id: document.id, ...document.data() });
  });

  return bookingList;
};

export const deleteBookingDocuments = async (carId) => {
  await firestore.collection("bookings").where("carId", "==", carId).delete();
};

export const uploadPhotoAsync = async (uri, imageName) => {
  const storage = getStorage();
  const reference = ref(storage, imageName);

  const img = await fetch(uri);
  const bytes = await img.blob();

  await uploadBytes(reference, bytes);

  return getDownloadURL(reference);
};
