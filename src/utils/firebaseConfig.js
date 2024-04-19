export const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_MESSAGING_SENDERID,
    messagingSenderId:process.env.FIREBASE_APP_ID,
    measurementId:process.env.FIREBASE_MEASUREMENT_ID
};

export const firebaseStorageURL = process.env.FIREBASE_BASE_STORAGE_URL