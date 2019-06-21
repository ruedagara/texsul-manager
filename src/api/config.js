import * as firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB-wZz7dEvKZ92V63M7RVCIvSVsiOonngo",
  authDomain: "texsul-792d2.firebaseapp.com",
  databaseURL: "https://texsul-792d2.firebaseio.com",
  projectId: "texsul-792d2",
  storageBucket: "texsul-792d2.appspot.com",
  messagingSenderId: "561867771372",
  appId: "1:561867771372:web:cc9273b5dbe63b2c"
};
console.log("INICIALIZANDO FIREBASE");
export default firebase.initializeApp(firebaseConfig);
