import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import reduxThunk from 'redux-thunk';
import * as serviceWorker from "./serviceWorker";
import  './api/config';
import firebase from 'firebase'
import {getData} from './false-api/api';

let creatSmallStats = true
const db = firebase.firestore()
var docRef = db.collection('smallStats');

const createSmallStats = () => {
  const smallStats = getData()
  if(createSmallStats) {
    smallStats.map(async (smallStat) => {
      await docRef.add(smallStat)
      console.log(`${smallStat.label} Creado`); 
    })
    creatSmallStats = false  
  }
}




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
