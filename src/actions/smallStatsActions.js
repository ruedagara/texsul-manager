//Importar el API
import { getInitialSmallStats } from "../api/firebase";
const SMALLSTATS_BY_INTERVEL_URL =
  "https://us-central1-texsul-792d2.cloudfunctions.net/getCustomSmallStats";

export const getSmallStats = () => async dispatch => {
  const smallStats = await getInitialSmallStats();
  //console.log("GET SMALL STATS",smallStats)
  dispatch({
    type: "get_small_stats",
    payload: smallStats
  });
};

export const getSmallStatsByInterval = inverval => async dispatch => {
  dispatch({
      type: 'loading'
  });
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  //headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  const config = {
    method: "POST",
    headers: headers,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(inverval)
  };
  console.log(inverval);
  let request = new Request(SMALLSTATS_BY_INTERVEL_URL, config);
  try {
    const response = await fetch(request);
    console.log(response);
    const data = await response.json();
    console.log("REQUEST");
    console.log("DATA", data);

    dispatch({
      type: "get_small_stats_by_interval",
      payload: data
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
        type: 'error',
        payload: error.message
    })
  }
};
