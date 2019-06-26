const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require('cors')({
  origin: true,
});
admin.initializeApp(functions.config().firebase);
// var serviceAccount = require("/Users/gustavorueda/Downloads/texsul-792d2-firebase-adminsdk-xess5-a16e909c73.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://texsul-792d2.firebaseio.com"
// });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

//TODO: Implementar cambios en los smallStats
const changeSmallStats = async (smallStats, label, db) => {
  const snap = await db
    .collection("smallStats")
    .where("label", "==", label)
    .get();
  const smallStat = snap.data();
  smallStat.id = snap.id;
};

//Cambia valores de dos cuentas a modificar de acuerdo al tipo de transacción realizado
const changeAccount = (account1, account2, type, value) => {
  console.log("Change Account", account1);
  switch (type) {
    case "ingreso":
      //TODO: Cambiar ventas por alguna otra cuenta de patrimonio
      account1.saldo += value; //Aumento saldo en cuenta activo
      account1.valor += value; //Aumento valor en cuenta activo
      account2.saldo += value; //Aumento saldo en cuenta ventas
      account2.valor += value; //Aumento valor en cuenta ventas
      break;
    case "egreso":
      account1.saldo -= value; //Disminuyo saldo en cuenta activo
      account1.valor -= value; //Disminuyo valor en cuenta activo
      account2.saldo += value; //Aumento saldo en cuenta gasto
      account2.valor += value; //Aumento valor en cuenta gasto
      break;
    case "pago-pasivo":
      if (account2.saldo > 0) {
        account1.saldo -= value; //Disminuyo saldo en cuenta activo
        account1.valor -= value; //Disminuyo valor en cuenta activo
        account2.saldo -= value; //Disminuyo saldo en cuenta pasivo
      }
      if (account2.saldo === 0) {
        account2.estado = "cancelado"; //Si se paga la deuda entonces poner como cancelada
      }
      break;
    default:
      break;
  }
  return { account1, account2 };
};

//Obtiene las cuentas a ser modificadas
const getAccounts = async (id1, id2, db) => {
  const snap1 = await db
    .collection("cuentas")
    .doc(id1)
    .get();
  const snap2 = await db
    .collection("cuentas")
    .doc(id2)
    .get();
  const account1 = snap1.data();
  account1.id = id1;
  const account2 = snap2.data();
  account2.id = id2;
  return { account1, account2 };
};

//Cambia las cuentas asociadas a una transacción cuando esta es creada
exports.newTransaction = functions.firestore
  .document("transacciones/{transactionID}")
  .onCreate(async (snap, context) => {
    //Accedemos a la nueva transacción
    const transaction = snap.data();
    //Especificamos el tipo y valor de transacción
    const type = transaction.tipo;
    const value = transaction.valor;
    //Traemos las cuentas a ser modificadas y las cuentas de smallStats
    let db = admin.firestore();
    const { account1, account2 } = await getAccounts(
      transaction["id-cuenta-1"],
      transaction["id-cuenta-2"],
      db
    );
    console.log("Account1", account1);
    //Cambiar los valores se saldo, valor y estado con una función de acuerdo al tipo de transaccion
    const finalAccounts = changeAccount(account1, account2, type, value);
    console.log("Final Accounts", finalAccounts);

    //Cambiar los valores de smallStats

    //Modificar los valores en las cuentas y smallStats dentro de firebase.
    db.collection("cuentas")
      .doc(finalAccounts.account1.id)
      .set(finalAccounts.account1);
    db.collection("cuentas")
      .doc(finalAccounts.account2.id)
      .set(finalAccounts.account2);
  });

//Obtener sumas de los valores para smallStats
const getResumeValues = transactions => {
  let ventas = 0;
  let gastos = 0;
  let resultados = 0;
  let ingresos = 0;
  let egresos = 0;
  let saldo = 0;

  transactions.map(transaction => {
    switch (transaction.tipo) {
      case "venta":
        ventas += transaction.valor;
        break;
      case "gasto":
        gastos += transaction.valor;
        break;
      case "ingreso":
        ingresos += transaction.valor;
        break;
      case "egreso":
        egresos += transaction.valor;
        break;
      case "pago-pasivo":
        egresos += transaction.valor;
        break;
      default:
        break;
    }
  });
  resultados = ventas - gastos;
  saldo = ingresos - egresos;
  return { ventas, gastos, resultados, ingresos, egresos, saldo };
};

//Organiza las transacciones por fecha y suma diferentes valores en la determinada fecha
const getValuesByInterval = transactions => {
  //Organizar transacciones por fecha, de menor a mayo
  const sortedTransactions = transactions.sort(function(x, y) {
    return x.fecha - y.fecha;
  });
  console.log("SORTED", JSON.stringify(sortedTransactions));
  const dateValueArray = [];
  sortedTransactions.map(transaction => {
    const type = transaction.tipo;
    const date = new Date(transaction.fecha._seconds * 1000);
    let day = date.getDate();
    let monthIndex = date.getMonth();
    const year = date.getFullYear();
    if (day < 10) {
      day = `0${day}`;
    }
    if (monthIndex < 10) {
      monthIndex = `0${monthIndex}`;
    }
    const dateString = `${year}/${monthIndex}/${day}`;
    const value = transaction.valor;
    const data = { dateString, value, type };
    dateValueArray.push(data);
  });
  console.log("DayValueArray", JSON.stringify(dateValueArray));

  //Agrupar suma de valores por fecha
  const groups = dateValueArray.reduce((groups, transaction) => {
    const date = transaction.dateString;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push({ value: transaction.value, type: transaction.type });
    return groups;
  }, {});

  console.log("GROUPS", JSON.stringify(groups));

  //Se realiza la suma del valor de las transacciones por cada fecha y retorna
  // [{date,value}, {date,value}]
  const groupArrays = Object.keys(groups).map(date => {
    const values = groups[date];
    let finalValue = 0;
    let ventas = 0;
    let gastos = 0;
    let resultados = 0;
    let ingresos = 0;
    let egresos = 0;
    let saldo = 0;
    //Sumar por tipo de transacción
    values.map(value => {
      // console.log("Value", value);
      // finalValue += value;
      switch (value.type) {
        case "venta":
          console.log("Venta");
          ventas += value.value;
          break;
        case "ingreso":
          console.log("Ingreso");
          ingresos += value.value;
          break;
        case "egreso":
          console.log("Egreso");
          egresos += value.value;
          break;
        case "gasto":
          console.log("Gasto");
          gastos += value.value;
          break;
        default:
          break;
      }
    });
    resultados = ventas - gastos;
    saldo = ingresos - egresos;
    return {
      date,
      values: { ventas, gastos, resultados, ingresos, egresos, saldo }
    };
  });
  return groupArrays;
};

//Obtiene la información para los smallStats de acuerdo a un rango de fechas determinado
exports.getCustomSmallStats = functions.https.onRequest(async (req, res) => {
  //console.log("JSON DE REQT",JSON.stringify(req.body))
  return cors(req,res, async () => {
    console.log(JSON.stringify(req.body));
    const body = req.body;
    console.log(body);
    
    //Obtener la fecha inicial y la fecha final de la consulta
    const startDate = new Date(body.startDate);
    const finalDate = new Date(body.finalDate);
    //console.log(startDate, finalDate);
  
    //Buscar en la base de datos aquellas transacciones realizadas en el periodo de tiempo dado
    const transactions = [];
    const db = admin.firestore();
    const snap = await db
      .collection("transacciones")
      .where("fecha", ">=", startDate)
      .where("fecha", "<=", finalDate)
      .get();
    if (!snap) {
      res.status(404).send({ error: "No se ha encontrado la base de datos" });
    }
    snap.forEach(doc => {
      const transaction = doc.data();
      transaction.id = doc.id;
      transactions.push(transaction);
    });
  
    //Obtener valores totales para smallStats
    const resumeValues = getResumeValues(transactions);
    console.log("resumeValues", resumeValues);
  
    //Realizar sumas por días
    //const interval = "days";
    const intervalValues = getValuesByInterval(transactions);
    //Organizar los intervalValues como dos Arrays que representen X y Y
    const dates = [];
    const values = [];
    intervalValues.map(interval => {
      dates.push(interval.date);
      values.push(interval.values);
    });
    const chartValues = { dates, values };
    //Enviar respuesta
    const response = { resumeValues, chartValues };
    //res.status(200).send(finalData);
    res.status(200).send(response);
  })
});

exports.getDataForBigStats = functions.https.onRequest(async (req, res) => {});
