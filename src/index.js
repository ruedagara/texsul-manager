import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";
import * as serviceWorker from "./serviceWorker";
import "./api/config";
import firebase from "firebase";
import { getData } from "./false-api/api";


let creatSmallStats = true;
const db = firebase.firestore();
var docRef = db.collection("transacciones");


// const createSmallStats = () => {
//   const smallStats = getData()
//   if(createSmallStats) {
//     smallStats.map(async (smallStat) => {
//       await docRef.add(smallStat)
//       console.log(`${smallStat.label} Creado`);
//     })
//     creatSmallStats = false
//   }
// }

const accounts = [
  {
    tipo: "activo",
    saldo: 200000000,
    valor: 200000000
  },
  // {
  //   tipo: "pasivo",
  //   saldo: 300000000,
  //   valor: 300000000
  // },
  // {
  //   tipo: "gasto",
  //   saldo: 100000000,
  //   valor: 100000000
  // },
  // {
  //   tipo: "ventas",
  //   saldo: 200000000,
  //   valor: 200000000
  //}
];

const createAccounts = () => {
  accounts.map(async account => {
    await docRef.add(account);
  });
};

const transaction  = {
  valor: 300000000,
  tipo: 'pasivo',
  'id-cuenta-1': 'HfJKpxyHsnA2WU3b3b06',
  'id-cuenta-2': 'VjyP7FyN83fo9FMzEgx4'
}
const createTransaction = () => {
    docRef.add(transaction);
};

// createTransaction();



const store = createStore(
  reducers, //Reducers
  {}, //Estado inicial
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
