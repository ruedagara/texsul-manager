const data = {
  smallStats: [
    {
      label: "Ventas",
      value: "$3.800M",
      percentage: "10.7%",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6", lg: "4" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [500, 600, 200, 300, 600, 250, 100, 150, 800, 100, 300]
        }
      ]
    },
    {
      label: "Gastos",
      value: "$3.648M",
      percentage: "-13.5",
      increase: false,
      dicrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6", lg: "4" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,65,105,0.1)",
          borderColor: "rgb(255,65,105)",
          data: [1, 2, 3, 3, 3, 4, 4]
        }
      ]
    },
    {
      label: "Resultados",
      value: "$152M",
      percentage: "2.4%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "12", sm: "12", lg: "4" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgb(0,123,255,0.1)",
          borderColor: "rgb(0,123,255)",
          data: [3, 2, 3, 2, 4, 5, 4]
        }
      ]
    },
    {
      label: "Ingresos de Efectivo",
      value: "$8.147M",
      percentage: "3.8%",
      increase: true,
      decrease: false,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6", lg: "4" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,180,0,0.1)",
          borderColor: "rgb(255,180,0)",
          data: [2, 3, 3, 3, 4, 3, 3]
        }
      ]
    },
    {
      label: "Egresos de Efectivo",
      value: "$2.900M",
      percentage: "2.71%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6", lg: "4" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,65,105,0.1)",
          borderColor: "rgb(255,65,105)",
          data: [1, 7, 1, 3, 1, 4, 8]
        }
      ]
    },
    {
      label: "Saldo de Efectivo",
      value: "$5.247M",
      percentage: "2.4%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "12", sm: "12", lg: "4" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgb(0,123,255,0.1)",
          borderColor: "rgb(0,123,255)",
          data: [500, 600, 200, 300, 600, 250, 100, 150, 800, 100, 200]
        }
      ]
    }
  ]
};

// export const getData = () => {
//   return new Promise((res, rect) => {
//     setTimeout(() => {
//       res(data.smallStats);
//     }, 5000);
//   });
// };

export const getData = () => {
  return data.smallStats
}

export const getData2 = () => {

}

export default {getData,getData2};
