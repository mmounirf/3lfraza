import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyBrUM7JVi1eb6USvLPwmWNvZydXfcGyHQI",
  authDomain: "alfraza-app.firebaseapp.com",
  databaseURL: "https://alfraza-app.firebaseio.com",
  projectId: "alfraza-app",
  storageBucket: "alfraza-app.appspot.com",
  messagingSenderId: "849176150513",
  appId: "1:849176150513:web:9eac8aa0dc790244050450",
  measurementId: "G-QXQN1ZVRY4"
};

const Firebase = app.initializeApp(config);
Firebase.auth().languageCode = "AR"

export default Firebase;