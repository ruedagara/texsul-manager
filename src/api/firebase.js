import firebase from "firebase";
const SMALL_STATS_COLLECTION = "smallStats";

export const getInitialSmallStats = () => {
  const db = firebase.firestore();
  const dbRef = db.collection(SMALL_STATS_COLLECTION).orderBy('position');
  let smallStats = [];
  return new Promise((res,rej) => {
      dbRef
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (!doc.exists) {
              throw new Error("No existe la base de datos");
            }
            console.log("La Colección existe");
            const data = doc.data();
            data.id = doc.id
            smallStats.push(data)
            console.log(smallStats);
          });
          console.log("SMALLSTATS RESPUESTA", smallStats);
          res(smallStats)
        })
        .catch(error => {
          rej(error);
        });     
  });
};

export default { getInitialSmallStats };
