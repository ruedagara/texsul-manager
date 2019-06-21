const INITIAL_SMALL_STATS = [
  {
    label: "Ventas",
    value: "",
    percentage: "",
    increase: false,
    chartLabels: [],
    attrs: { md: "6", sm: "6", lg: "4" },
    datasets: [
    ]
  },
  {
    label: "Gastos",
    value: "",
    percentage: "",
    increase: false,
    dicrease: false,
    chartLabels: [],
    attrs: { md: "6", sm: "6", lg: "4" },
    datasets: [
    ]
  },
  {
    label: "Resultados",
    value: "",
    percentage: "",
    increase: false,
    decrease: false,
    chartLabels: [],
    attrs: { md: "12", sm: "12", lg: "4" },
    datasets: []
  },
  {
    label: "Ingresos de Efectivo",
    value: "",
    percentage: "",
    increase: false,
    decrease: false,
    chartLabels: [],
    attrs: { md: "6", sm: "6", lg: "4" },
    datasets: [
      
    ]
  },
  {
    label: "Egresos de Efectivo",
    value: "",
    percentage: "",
    increase: false,
    decrease: false,
    chartLabels: [],
    attrs: { md: "6", sm: "6", lg: "4" },
    datasets: [
     
    ]
  },
  {
    label: "Saldo de Efectivo",
    value: "",
    percentage: "",
    increase: false,
    decrease: false,
    chartLabels: [],
    attrs: { md: "12", sm: "12", lg: "4" },
    datasets: [
    ]
  }
]

const INITIAL_STATE = {
  smallStats: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "get_small_stats":
      return { ...state, smallStats: action.payload };
    default:
      return state;
  }
};
