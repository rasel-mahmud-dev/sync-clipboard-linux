// Import the functions you need from the SDKs you need
require('dotenv').config();

const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

console.log(firebaseConfig)

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export the db object for use in other files
module.exports = db;
