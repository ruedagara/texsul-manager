export default [
  {
    label: "Ventas",
    type: 'ventas',
    value: "",
    percentage: "",
    increase: false,
    dicrease: false,
    chartLabels: [],
    attrs: { md: "6", sm: "6", lg: "4" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "rgba(0, 184, 216, 0.1)",
        borderColor: "rgb(0, 184, 216)",
        data: []
      }
    ]
  },
  {
    label: "Gastos",
    type: 'gastos',
    value: "",
    percentage: "",
    increase: false,
    dicrease: false,
    chartLabels: [],
    attrs: { md: "6", sm: "6", lg: "4" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "rgba(255,65,105,0.1)",
        borderColor: "rgb(255,65,105)",
        data: []
      }
    ]
  },
  {
    label: "Resultados",
    type: 'resultados',
    value: "",
    percentage: "",
    increase: false,
    decrease: false,
    chartLabels: [],
    attrs: { md: "12", sm: "12", lg: "4" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "rgb(0,123,255,0.1)",
        borderColor: "rgb(0,123,255)",
        data: []
      }
    ]
  },
  {
    label: "Ingresos de Efectivo",
    type: 'ingresos',
    value: "",
    percentage: "",
    increase: false,
    decrease: false,
    chartLabels: [],
    attrs: { md: "6", sm: "6", lg: "4" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "rgba(255,180,0,0.1)",
        borderColor: "rgb(255,180,0)",
        data: []
      }
    ]
  },
  {
    label: "Egresos de Efectivo",
    type: 'egresos',
    value: "",
    percentage: "",
    increase: false,
    decrease: false,
    chartLabels: [],
    attrs: { md: "6", sm: "6", lg: "4" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "rgba(255,65,105,0.1)",
        borderColor: "rgb(255,65,105)",
        data: []
      }
    ]
  },
  {
    label: "Saldo de Efectivo",
    type: 'saldo',
    value: "",
    percentage: "",
    increase: false,
    decrease: false,
    chartLabels: [],
    attrs: { md: "12", sm: "12", lg: "4" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "rgb(0,123,255,0.1)",
        borderColor: "rgb(0,123,255)",
        data: []
      }
    ]
  }
];
