const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

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

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

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
  return { venta, gastos, resultados, ingresos, egresos, saldo };
};

const getSmallStatsData = (resumeValues, dayValues) => {
  const nullDayArray = [];
};

//TODO: Obtener suma de datos agrupados por días
const getValuesByInterval = (transactions, interval) => {
  //Organizar transacciones por fecha, de menor a mayo
  const sortedTransactions = transactions.sort(function(x, y) {
    return x.fecha - y.fecha;
  });
  //Identificar primer dia de la consulta y ultimo día de la consulta
  const firstDate = sortedTransactions[0].fecha;
  const lastDate = sortedTransactions[sortedTransactions.length - 1].fecha;
  //Acumular datos por intervalos si:
  const groupedTransactionValues = {};
  sortedTransactions.reduce((value1, value2, index, vector) => {
    const date1 = new Date(value1.fecha);
    const date2 = new Date(value2.fecha);
    if (date1.getDay === date2.getDay) {
      const sum = value1.valor + value2.valor;
      //TODO: sumar valor dos solo si valor 1 ya esta sumado
      groupedTransactionValues[date1.getDay] += sum;
      return value1.valor + value2.valor;
    }
  });
};

exports.getCustomSmallStats = functions.https.onRequest(async (req, res) => {
  //Obtener la fecha inicial y la fecha final de la consulta
  const startDate = new Date(req.params.startDate);
  const endDate = new Date(req.params.finalDate);
  //Buscar en la base de datos aquellas transacciones realizadas en el periodo de tiempo dado
  const transactions = [];
  const db = admin.firestore.collection("transacciones");
  const snap = await db
    .where("fecha", ">", startDate)
    .where("fecha", "<", endDate)
    .get();
  if (!snap) {
    res.status(404).send({ error: "No se ha encontrado la base de datos" });
  }
  snap.forEach(doc => {
    const transaction = doc.data();
    console.log("Transaction Data", transaction);
    transaction.id = doc.id;
    transactions.push(transaction);
  });

  //Obtener valores totales para smallStats
  const resumeValues = getResumeValues(transactions);
  console.log("resumeValues", resumeValues);
  //Ventas: Sumar todos los valores de transacciones de venta
  //Gastos: Sumar todos los valores de transacciones de gastos
  //Resultados: Realizar resta entre Ventas y Gastos
  //Ingresos de Efectivo: Sumar todos los valores de transacciondes de ingresos
  //Egresos de Efectivo: Sumar todos los valores de transacciones de egresos
  //Saldo: Realizar resta entre Ingresos de Efectivo y Egresos de Efectivo

  //Realizar sumas por días
  const interval = "days";
  const intervalValues = getValuesByInterval(transactions, interval);
  console.log("dayValues", dayValues);

  //Organizar el JSON teniendo en cuenta el cambio en el datasets y numero de días
  const finalData = getSmallStatsData(resumeValues, intervalValues);
  console.log("finalData", finalData);

  //Enviar respuesta
  res.status(200).send(finalData);
});
