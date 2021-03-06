const INITIAL_SMALL_STATS = [
  {
    label: "Ventas",
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
]

const INITIAL_DATA = {
  resumeValues: {},
  chartValues: {
    dates: [],
    values: []
  }
}

const INITIAL_STATE = {
  data: INITIAL_DATA,
  loading: false,
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "get_small_stats":
      return { ...state, data: action.payload };
    case 'get_small_stats_by_interval':
      return {...state, data: action.payload, loading: false}
    case 'loading':
      return {...state, loading: true}
    case 'error':
      return {...state, error: action.payload, loading: false}
    default:
      return state;
  }
};
